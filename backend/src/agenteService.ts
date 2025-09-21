import { PrismaClient, Agente, Prisma } from './generated/prisma'
import { agenteDTO } from './dto/agente'

export class agenteService {
    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    async findByAll(): Promise<Agente[]> {
        const agentes = await this.prisma.agente.findMany()
        //agentes.forEach(agente => {
        //    console.log(`${agente.nome_Artistico} - DRT: ${agente.drt}`)
        //})
        return agentes
    }

    async findByDrt(drt: string): Promise<Agente | null> {
        return this.prisma.agente.findFirst({ where: { drt } })
    }
    
    async createAgente(agente: agenteDTO): Promise<Agente> {
        return this.prisma.agente.create({ data: {
                          nome: agente.nome,
                          nome_Artistico: agente.nome_artistico,
                          drt: agente.drt,
                          curriculo_reumido: agente.curriculo_resumido,           
        } })
    }

    async updateAgente(id: number, agente: agenteDTO ): Promise<Agente> {
      
        const agenteAtual: Partial<agenteDTO> = {}

        if (agente.nome !== undefined) agenteAtual.nome = agente.nome
        if (agente.nome_artistico !== undefined) agenteAtual.nome_artistico = agente.nome_artistico
        if (agente.drt !== undefined) agenteAtual.drt = agente.drt
        if (agente.curriculo_resumido !== undefined) agenteAtual.curriculo_resumido = agente.curriculo_resumido

        return this.prisma.agente.update({
            where: { id_Agente: id },
            data: agenteAtual
        })
    }

    async deleteAgente(id: number): Promise<Agente | null>{

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
