import express, { Request, Response } from 'express';
import cors from 'cors';
import { agenteService } from './agenteService';
import { PrismaClient , Prisma} from '@prisma/client';
import { z, ZodError } from 'zod';
import dotenv from 'dotenv';

// Carrega as variáveis do .env
dotenv.config();

// Cria uma instância da aplicação Express
const app = express();

// CORS básico para dev (front em Vite)
//app.use(cors({origin: 'http://localhost:5173'}))
app.use(cors({origin: process.env.ALLOWED_ORIGIN}))
app.use(express.json()) // necessário para ler req.body em JSON

// Cria a instância do agente
const src_agente = new agenteService();


// Rota simples só para conferir se o servidor está no ar
app.get('/', (_req: Request, res: Response) => {
    res.json({ ok: true, msg: 'API de Ori-gens no ar!' })
})

// Busca todos os agentes
app.get('/agentes', async (_req: Request, res: Response) => {
    try {
        //console.log('Requisição para agentes recebida!');
        const agentes = await src_agente.findByAll();
        return res.status(200).json(agentes);
    } catch (error) {
        console.error('Erro: ', error)
        return res.status(500).json({erro: 'Erro ao listar agentes.'}) 
    }
});

/**
 * GET /agentes/:id
 * - Converte o :id da URL para número
 * - Se o agente existir, retorna 200 com o agente
 * - Se não existir, retorna 404 com uma mensagem clara
 * - Se o id for inválido (NaN, negativo), retorna 400
 */
app.get('/agentes/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    // Validação simples do ID (evita NaN e números inválidos)
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'ID inválido. Use um inteiro positivo.' })
    }

    try {
        const agente = await src_agente.findUnique(id)

        if (!agente) {
            return res.status(404).json({ error: 'Agente não encontrado' })
        }

        return res.status(200).json(agente)
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar agente.' })
    }
})

// busca o agente pela drt
app.get('/agentes/drt/:drt', async (req: Request<{drt: string}>, res: Response) => {
    //console.log('Requisição para buscar um agente!');
    try {
        const drt = req.params.drt  
        
        if (drt == null || drt.trim() === "") {
            return res.status(404).json({info: 'O drt é nulo, indefinido ou vazio'})
        }

        const agente = await src_agente.findByDrt(drt)

        if (!agente){
            return res.status(404).json({info: 'Agente não encontrado!'})
        }
        return res.status(200).json(agente);
    } catch(error){
        console.error('Erro: ', error)
        return res.status(500).json({erro: 'Erro ao mostrar o agente.'})
    }
    
});

/**
 * Schemas Zod
 * - createAgenteSchema: criação (campos obrigatórios)
 * - updateAgenteSchema: atualização parcial (todos opcionais)
 */
// Schema de criação de agente
export const createAgenteSchema = z.object({
    nome: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
    nome_Artistico: z.string().min(3, 'O nome artistico deve ter pelo menos 3 caracteres'),    
    // coerce: tenta converter "2800" (string) em número antes de validar positive()
    //price: z.coerce.number().positive('Preço deve ser maior que zero'),
    drt: z.string().min(1, 'DRT não pode ser vazio!'),
    curriculo_Resumido: z.string().min(100, 'Currículo resumido deve ter pelo menos 100 caracteres'),
    //isFeatured: z.coerce.boolean().optional().default(false), // true/false/"true"/"false"
})


// Inserir um novo agente
app.post('/agentes', async (req: Request, res: Response) => {
    //console.log('Requisição para buscar um agente!');
    try {
        //const agente = req.body
        const agente = createAgenteSchema.parse(req.body) //valida e transforma o json em objeto
        if (!agente || !agente.nome) {
           return res.status(400).json({ erro: 'Dados do agente inválidos' })
        }
        
        //console.log(agente)
        const novoAgente = await src_agente.createAgente(agente)
      
        if (!novoAgente){
          return res.status(404).json({info: 'Agente não criado!'})
        }
        return res.status(201).json(agente);       
    } catch(error){
        console.error('POST api/agentes Erro: ', error)
        if (error instanceof ZodError) {
            return res.status(400).json({
                error: 'Payload inválido',
                issues: error.issues.map((e) => ({
                    path: e.path.join('.'),
                    message: e.message,
                })),
            })
        }

        return res.status(500).json({erro: 'Erro ao inserir um agente.'})
    }
    
});

const updateAgenteSchema = createAgenteSchema.partial()

// Atualizar um agente
app.put('/agente/:id', async (req: Request<{id: number}>, res: Response) => {
    //console.log('Requisição para buscar um agente!');
    try {
        const id = Number(req.params.id)
        if (isNaN(id)) {
           return res.status(400).json({ erro: 'Necessário informar id' })
        }

        const agente = updateAgenteSchema.parse(req.body) // valida parciais
        //const agente = req.body
        //if (!agente || !agente.drt) {
        //   return res.status(400).json({ erro: 'Dados do agente inválidos' })
       //}
        
        console.log(agente)
        const atualAgente = await src_agente.updateAgente(id, agente)
      
        if (!atualAgente){
          return res.status(404).json({info: 'Agente não atualizado!'})
        }
        return res.status(200).json(atualAgente);       
    } catch(error){
        console.error('Erro: ', error)
                if (error instanceof ZodError) {
            return res.status(400).json({
                error: 'Payload inválido',
                issues: error.issues.map((e) => ({
                    path: e.path.join('.'),
                    message: e.message,
                })),
            })
        }
        console.error(`PUT /api/agente/${req.params.id} error:`, error)   
        return res.status(500).json({erro: 'Erro ao Atualizar o cadastro de agente.'})
    }
    
});

// Excluir um agente
app.delete('/agente/:id', async (req: Request<{id: number}>, res: Response) => { 

    try {
        const id = Number(req.params.id)
        if (isNaN(id)) {
           return res.status(400).json({ erro: 'Necessário informar id' })
        }

        const agenteDeletado = await src_agente.deleteAgente(id)
        return res.status(204).json(agenteDeletado)

    } catch(error){
        console.error('Erro: ', error)
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return res.status(404).json({ error: 'Agente não encontrado' })
        }
        console.error(`DELETE /api/agente/${req.params.id} error:`, error)        
        return res.status(500).json({erro: 'Erro ao excluir o agente.'})
    }
})

// Define a porta em que o servidor vai rodar
// Usamos 3001 para não conflitar com o front-end (que geralmente usa 3000 ou 5173)
const PORT = process.env.PORT || 3001;

// Inicia o servidor e o faz "escutar" por requisições na porta definida
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando com sucesso em http://localhost:${PORT}`);
});

