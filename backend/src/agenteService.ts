import { PrismaClient, Prisma } from '@prisma/client'
import { agenteDTO } from './dto/agente'

export class agenteService {
    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    async findByAll(): Promise<agenteDTO[]> {
        const agentes = await this.prisma.agente.findMany()
        //agentes.forEach(agente => {
        //    console.log(`${agente.nome_Artistico} - DRT: ${agente.drt}`)
        //})
        return agentes
    }

    async findByDrt(drt: string): Promise<agenteDTO | null> {
        return this.prisma.agente.findFirst({ where: { drt } })
    }
    
    async createAgente(agente: agenteDTO): Promise<agenteDTO> {
        return this.prisma.agente.create({ data: {
                          nome: agente.nome,
                          nome_Artistico: agente.nome_Artistico,
                          drt: agente.drt,
                          curriculo_Resumido: agente.curriculo_Resumido,           
        } })
    }

    async updateAgente(id: number, agente: agenteDTO ): Promise<agenteDTO> {
      
        const agenteAtual: Partial<agenteDTO> = {}

        if (agente.nome !== undefined) agenteAtual.nome = agente.nome
        if (agente.nome_Artistico !== undefined) agenteAtual.nome_Artistico = agente.nome_Artistico
        if (agente.drt !== undefined) agenteAtual.drt = agente.drt
        if (agente.curriculo_Resumido !== undefined) agenteAtual.curriculo_Resumido = agente.curriculo_Resumido

        return this.prisma.agente.update({
            where: { id_Agente: id },
            data: agenteAtual
        })
    }

    async deleteAgente(id: number): Promise<agenteDTO | null>{

       try {
            const agenteDeletado = await this.prisma.agente.delete({where: { id_Agente: id }, })
            return agenteDeletado
        } catch (error) {            
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {            
              return null
            }
            throw error
        }
    }

    async disconnect() {
        await this.prisma.$disconnect()
    }
}
