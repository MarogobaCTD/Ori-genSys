import express, { Request, Response } from 'express';
import test from './testConnection';
import { agenteService } from './agenteService';
import { agenteDTO } from './dto/agente';

// Cria uma instância da aplicação Express
const app = express();

app.use(express.json())

// Cria a instância do agente
const src_agente = new agenteService();

// Define a porta em que o servidor vai rodar
// Usamos 3001 para não conflitar com o front-end (que geralmente usa 3000 ou 5173)
const PORT = 3001;

// Define uma rota inicial (endpoint) para o nosso servidor
// Quando alguém acessar a raiz ('/') com o método GET...
app.get('/', (req: Request, res: Response) => {
    // ...nós responderemos com um objeto JSON.
    res.json({ status: 'ok' });
});

// Busca todos os agentes
app.get('/agentes', async (req: Request, res: Response) => {
    //console.log('Requisição para /agentes recebida!');
    const agentes = await src_agente.findByAll();
    res.json(agentes);
});

// busca o agente pela drt
app.get('/agentes/:drt', async (req: Request<{drt: string}>, res: Response) => {
    //console.log('Requisição para buscar um agente!');
    try {
        const { drt } = req.params     
        const agente = await src_agente.findByDrt(drt)

        if (!agente){
            return res.status(404).json({info: 'Agente não encontrado!'})
        }
        res.json(agente);
    } catch(error){
        console.error('Erro: ', error)
        res.status(500).json({erro: 'Erro no servidor'})
    }
    
});

// Inserir um novo agente
app.post('/agentes', async (req: Request, res: Response) => {
    //console.log('Requisição para buscar um agente!');
    try {
        const agente = req.body
        if (!agente || !agente.nome) {
           return res.status(400).json({ erro: 'Dados do agente inválidos' })
        }
        
        //console.log(agente)
        const novoAgente = await src_agente.createAgente(agente)
      
        if (!novoAgente){
          return res.status(404).json({info: 'Agente não criado!'})
        }
        res.json(agente);       
    } catch(error){
        console.error('Erro: ', error)
        res.status(500).json({erro: 'Erro no servidor'})
    }
    
});

// Atualizar um agente
app.put('/agente/:id', async (req: Request<{id: number}>, res: Response) => {
    //console.log('Requisição para buscar um agente!');
    try {
        const id = Number(req.params.id)
        if (isNaN(id)) {
           return res.status(400).json({ erro: 'Necessário informar id' })
        }

        const agente = req.body
        if (!agente || !agente.drt) {
           return res.status(400).json({ erro: 'Dados do agente inválidos' })
        }
        
        console.log(agente)
        const atualAgente = await src_agente.updateAgente(id, agente)
      
        if (!atualAgente){
          return res.status(404).json({info: 'Agente não atualizado!'})
        }
        res.json(agente);       
    } catch(error){
        console.error('Erro: ', error)
        res.status(500).json({erro: 'Erro no servidor'})
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
        if (!agenteDeletado) {
            return res.status(404).json({ erro: 'Agente não encontrado' })
        }
        res.json(agenteDeletado)

    } catch(error){
        console.error('Erro: ', error)
        res.status(500).json({erro: 'Erro no servidor'})
    }
})

// Inicia o servidor e o faz "escutar" por requisições na porta definida
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando com sucesso em http://localhost:${PORT}`);
});

