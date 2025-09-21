import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function test() {
    // Busca todos os agentes
    const agentes = await prisma.agente.findMany()

    
    // Veja a mágica: o TypeScript conhece TODOS os campos!
    agentes.forEach((agente: { nome_Artistico: any; drt: any }) => {
        console.log(`${agente.nome_Artistico} - DRT: ${agente.drt}`)        
    })

    return agentes
}

export default test;