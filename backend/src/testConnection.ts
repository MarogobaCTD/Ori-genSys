import { PrismaClient } from './generated/prisma'

const prisma = new PrismaClient()

async function test() {
    // Busca todos os agentes
    const agentes = await prisma.agente.findMany()

    
    // Veja a mágica: o TypeScript conhece TODOS os campos!
    agentes.forEach(agente => {
        console.log(`${agente.nome_Artistico} - DRT: ${agente.drt}`)        
    })

    return agentes
}

export default test;