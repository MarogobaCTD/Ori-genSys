import { PrismaClient, Prisma } from '@prisma/client'
import { usuarioDTO } from './dto/usuario'

export class usuarioService {
    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    async findByAll(): Promise<usuarioDTO[]> {
        const usuarios = await this.prisma.usuario.findMany()
        return usuarios
    }

    async findUser(email: string){
        return this.prisma.usuario.findUnique({where: { email } })
    }

    async createUsuario(usuario: usuarioDTO){
        return this.prisma.usuario.create({ data: {
                          email: usuario.email,
                          senha: usuario.senha,
                          nome: usuario.nome ?? null
        } 
      })
    }

    async findUnique(userId: number){
        return this.prisma.usuario.findUnique({
            where: { id_usuario: userId },
            select: { id_usuario: true, email: true, nome: true } // Não buscar a senha
        })
    }

  }