import express, { Request, Response } from 'express';
import cors from 'cors';
import { agenteService } from './agenteService';
import { PrismaClient , Prisma} from '@prisma/client';
import { z, ZodError } from 'zod';
import dotenv from 'dotenv';
import { usuarioService } from './usuarioService';
import { usuarioDTO } from './dto/usuario';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';

// Carrega as variáveis do .env
dotenv.config();

// Cria uma instância da aplicação Express
const app = express();

// CORS básico para dev (front em Vite)
//app.use(cors({origin: 'http://localhost:5173'}))
app.use(cors({origin: process.env.ALLOWED_ORIGIN}))
app.use(express.json()) // necessário para ler req.body em JSON

//Criação do Schema de validação para autenticação
const registroSchema = z.object({
    email: z.email('Email inválido'),
    senha: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
    nome: z.string().nullable().optional()
})

const loginSchema = z.object({
    email: z.email('Email inválido'),
    senha: z.string().min(1, 'Senha é obrigatória!')
})

// Cria a instância do usuário
const src_usuario = new usuarioService();

// Interface para estender o Request do Express
interface AuthRequest extends Request {
    user?: {
        id_usuario: number
        email: string
        nome?: string | null
    }
}

/**
 * Middleware de autenticação
 * - Extrai token do header Authorization
 * - Verifica se token é válido
 * - Busca usuário no banco
 * - Anexa usuário à requisição para uso posterior
 */
const authMiddleware = async (req: AuthRequest, res: Response, next: any) => {
    try {
        // 1. Extrair token do header Authorization
        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.status(401).json({ error: 'Token de acesso não fornecido' })
        }

        // Header deve ser: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        const token = authHeader.split(' ')[1]

        if (!token) {
            return res.status(401).json({ error: 'Formato do token inválido' })
        }

        if (!process.env.JWT_SECRET) {
           throw new Error("JWT_SECRET não definida no .env");
        }

        // 2. Verificar se token é válido
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: number }

        // 3. Buscar usuário no banco
        const user = await src_usuario.findUnique(decoded.userId)

        if (!user) {
            return res.status(401).json({ error: 'Usuário não encontrado' })
        }

        // 4. Anexar usuário à requisição
        req.user = user

        // 5. Continuar para a próxima função (rota final)
        next()

    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: 'Token inválido' })
        }
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: 'Token expirado' })
        }
        return res.status(500).json({ error: 'Erro interno do servidor' })
    }
}


// Rota simples só para conferir se o servidor está no ar
app.get('/', (_req: Request, res: Response) => {
    res.json({ ok: true, msg: 'API de Ori-gens no ar!' })
})

/**
 * GET /api/auth/me
 * - Rota protegida para verificar se token está funcionando
 * - Retorna informações do usuário logado
 */
app.get('/api/auth/me', authMiddleware, (req: AuthRequest, res: Response) => {
    // Se chegou até aqui, o middleware já validou o token
    return res.status(200).json({
        message: 'Usuário autenticado',
        user: req.user
    })
})

/**
 * POST /api/auth/registro
 * 1. Valida os dados de entrada
 * 2. Verifica se o email já existe
 * 3. Cria hash da senha
 * 4. Salva usuário no banco
 * 5. Retorna token JWT
 * 
 */
app.post('/api/auth/registro', async(req: Request, res: Response) => {
    try{
        //1. Valida os dados de entrada
        const {email, senha, nome } = registroSchema.parse(req.body)

        //2. Verifica se o email já existe
        const existingUser = await src_usuario.findUser(email)

        if (existingUser) {
            return res.status(400).json({ error: 'Email já está em uso' })
        }

        // 3. Criar hash da senha (10 rounds é um bom padrão de segurança)
        const hashedPassword = await bcrypt.hash(senha, 10)

        // 4. Criar usuário no banco        
        const usuario: usuarioDTO = {
            email: email,
            senha: hashedPassword,
            nome: nome ?? null
        };

        const novoUsuario = await src_usuario.createUsuario(usuario)

        if (!process.env.JWT_SECRET) {
           throw new Error("JWT_SECRET não definida no .env");
        }

        // 5. Gerar token JWT
        const token = jwt.sign(
            { userId: novoUsuario.id_usuario }, // Payload: informações que queremos no token
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES || '7d' }  as SignOptions// Token expira conf. env ou em 7 dias
        )

        // 6. Retornar sucesso (sem a senha!)
        return res.status(201).json({
            message: 'Usuário criado com sucesso',
            token,
            user: {
                id: novoUsuario.id_usuario,
                email: novoUsuario.email,
                nome: novoUsuario.nome
            }
        })

    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.message })
        }
        return res.status(500).json({ error: 'Erro interno do servidor' })
    }
})

/**
 * POST /api/auth/login
 * - Valida os dados de entrada
 * - Busca usuário pelo email
 * - Compara senha fornecida com hash salvo
 * - Retorna token JWT se autenticação for bem-sucedida
 */
app.post('/api/auth/login', async (req: Request, res: Response) => {
    try {
        // 1. Validar dados de entrada
        const { email, senha } = loginSchema.parse(req.body)

        // 2. Buscar usuário no banco
        const usuario = await src_usuario.findUser(email)

        if (!usuario) {
            return res.status(401).json({ error: 'Email ou senha incorretos' })
        }

        // 3. Comparar senha fornecida com hash salvo
        const isPasswordValid = await bcrypt.compare(senha, usuario.senha)

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Email ou senha incorretos' })
        }

        if (!process.env.JWT_SECRET) {
           throw new Error("JWT_SECRET não definida no .env");
        }

        // 4. Gerar token JWT
        const token = jwt.sign(
            { userId: usuario.id_usuario }, // Payload: informações que queremos no token
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES || '7d' }  as SignOptions// Token expira conf. env ou em 7 dias
        )

        // 5. Retornar sucesso
        return res.status(200).json({
            message: 'Login realizado com sucesso',
            token,
            user: {
                id: usuario.id_usuario,
                email: usuario.email,
                nome: usuario.nome
            }
        })

    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.message })
        }
        return res.status(500).json({ error: 'Erro interno do servidor' })
    }
})

// Cria a instância do usuário
const src_agente = new agenteService();

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
app.post('/agentes', authMiddleware, async (req: AuthRequest, res: Response) => {
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
        return res.status(201).json({
            message: 'Agente criado com sucesso!',
            agente});

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
app.put('/agente/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
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
        return res.status(200).json({
            message: 'Agente alterado com sucesso!',
            atualAgente});

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
app.delete('/agente/:id', authMiddleware, async (req: AuthRequest, res: Response) => { 

    try {
        const id = Number(req.params.id)
        if (isNaN(id)) {
           return res.status(400).json({ erro: 'Necessário informar id' })
        }

        const agenteDeletado = await src_agente.deleteAgente(id)
        return res.status(204).json({
            message: 'Produto deletado com sucesso!'
        })

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

