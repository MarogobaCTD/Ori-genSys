<h1>    
    <span> Desenvolvimento Back-End da Pós Desenvolvimento Web e Mobile - IFSudesteMG - 2025</span>
</h1>

Repositório do desenvolvido Back-End do sistema **Ori-genSys** como resultado da implementação da matéria Back-End e as atividades solicitadas pelo professor ao longo das aulas.

## Objetivo
Aplicar o que foi aprendido ao longo das aulas no sistema Ori-genSys.

## Ferramentas
[![GitHub](https://img.shields.io/badge/GitHub-000?style=for-the-badge&logo=github&logoColor=30A3DC)](https://docs.github.com/)
[![Git](https://img.shields.io/badge/Git-000?style=for-the-badge&logo=git&logoColor=E94D5F)](https://git-scm.com/doc) 

## Percurso
<table>
  <thead>
    <tr align="left">
      <th>Nº</th>
      <th>Etapas</th>
    </tr>
  </thead>
  <tbody align="left">
    <tr>
      <td>01</td>
      <td>Implementação da API</td>
    </tr>
    <tr>
      <td>02</td>
      <td>Implementação da API no FrontEnd</td>
    </tr>
    <tr>
      <td>03</td>
      <td>Testes</td>  
    </tr>
    <tr>
      <td>04</td>
      <td>Documentação</td>    
    </tr>
  </tbody>
</table>


---
## Implementação da API
Implementação uma API back-end em Node.js + TypeScript + Express que persiste produtos em um banco PostgreSQL. Use Docker/Docker Compose para subir o banco e Prisma para modelagem, migrations e seed. Teste os endpoints com Insomnia.

### Instruções de execução 

- Baixe o projeto e o abra no VSCode
- Execute todos os comandos abaixo pelo terminal do VSCode
- É preciso ter o Nodejs na versão 20 pois na 22 há instabilidade com o Prisma.

**Instalando o Express e o TypeScript**
- Instalar o Express e o Typescript
npm install express
npm install -D typescript @types/node @types/express tsx
- Iniciar o typescript
npm tsc --init
======================================
**Instalando o Docker e o TypeScript**
- Baixar o [![Docker](https://img.shields.io/badge/Docker-257?style=for-the-badge&logo=docker)](https://www.docker.com/) na sua máquina e após instalação, verificar se ela está executando
- Voltar no VSCode e digitar no terminal para ver as versões do Docker e docker-compose:
docker --version
docker-compose --version
- Subir o Docker
docker-compose up -d
======================================
**Instalando o Prisma e o Prisma client**
- Pelo terminal digiter as linhas abaixo para instalar o prisma e o prisma/client:
npm install -D prisma
npm install @prisma/client
- Para iniciar o prisma:
npx prisma init
- Para realizar a migrate do prisma, isso é a migração e criação dos schema das tabelas:
npx prisma migrate dev --name init
- Observações:
  - Caso seja preciso resetar a migração e criar novamente o schema das tabelas
    - npx prisma migrate reset
======================================	
**Visualizar as tabelas pelo Prisma Studio**

npx prisma studio
======================================
**Executando o seed com informações para popular o banco**

npx prisma db seed
======================================
**Executando o testConnection para ver a API**

npx tsx src/testConnection.ts
======================================
**Excutando a API para consumir no Insomnia**

npm run dev
======================================
**Instalando o Zod**

Ele é uma biblioteca de validação de dados e tipagem em tempo de excução pelo TS e JS, pode determinar como aquela informação será estruturada, podendo validar o objeto ter a forma e valores válidos.

npm install zod

**Utilização do Zod**

É preciso criar o schema para o zod realizar a validação e tipagem em tempo de execução
======================================
**Instalação do Dotenv para visualizar a referências**
Ele é uma biblioteca que carrega variáveis de ambiente definidas em um arquivo chamado .env e as disponibiliza em process.env dentro da aplicação.

npm install dotenv
npm install --save-dev @types/dotenv
======================================
**Criação da solução de autenticação - Instalação das bibliotecas necesárias**
bcryptjs - protege a senha com criptografia (hash)
jsonwebtoken - cria passes (token) para acessos e autenticação para realizar as atividades

**Instalar o bcrypt**
npm install bcrypt
npm install --save-dev @types/bcrypt

**Instalar o jsonwebtoken**
npm install jsonwebtoken
npm install --save-dev @types/jsonwebtoken

**Instalar os dois de uma só vez**
npm install bcryptjs jsonwebtoken
npm install -D @types/bcryptjs @types/jsonwebtoken
======================================
**Criar uma nova tabela no banco**
npx prisma migrate dev --name create-usuario
======================================
**Caso seja preciso limpar o cache e gerar novamente os módulos**
Limpando o cache e gerando node novamente
rm -rf node_modules/.prisma
rm -rf node_modules
npm install
npx prisma generate

### 🧩 Validação do schema `Agente`
```ts
export const createAgenteSchema = z.object({
  nome: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  nome_Artistico: z.string().min(3, 'O nome artistico deve ter pelo menos 3 caracteres'),
  drt: z.string().min(1, 'DRT não pode ser vazio!'),
  curriculo_Resumido: z.string().min(100, 'Currículo resumido deve ter pelo menos 100 caracteres')
});
```

Nos métodos `POST` e `PUT` você pode utilizá-lo para validar

Exemplo:

  POST:  

     const agente = createAgenteSchema.parse(req.body) //valida e transforma o json em objeto

  PUT: 

    Antes do app.put: const updateAgenteSchema = createAgenteSchema.partial()
    Dentro do app.put: const agente = updateAgenteSchema.parse(req.body) // valida parciais

  TRATANDO A MENSAGEM DE ERRO:

    if (error instanceof ZodError) {
            return res.status(400).json({
                error: 'Payload inválido',
                issues: error.issues.map((e) => ({
                    path: e.path.join('.'),
                    message: e.message,
                })),
            })
        }

## 🧩 Usando o bcrypt e o Jwt

BCRYPT

A utilização do bcrypt é bem simples, você precisará determinar quantos caracteres
serão usados para o hash, 10 rounds é um bom padrão de segurança.

- Exemplo:
  const hashedPassword = await bcrypt.hash(senha, 10)

  //Passa no DTO ou na criadão do usuário pelo create do Prisma
  const usuario: usuarioDTO = {
            email: email,
            senha: hashedPassword,
            nome: nome ?? null
  };

  const novoUsuario = await src_usuario.createUsuario(usuario)

======================================
JWT

A utilização do jwt serve para realizar a autenticação do usuário e geração do token 
com a sua JWT_SECRET (pode ser uma frase, sequência de caracteres que faça sentido)

- Exemplo
    //Utilizando o dotEnv para retornar a JWT_SECRET   
    if (!process.env.JWT_SECRET) {
       throw new Error("JWT_SECRET não definida no .env");
    }

    //Gerar token JWT
    const token = jwt.sign(
        { userId: novoUsuario.id_usuario }, // Payload: informações que queremos no token
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES || '7d' }  as SignOptions// Token expira conf. env ou em 7 dias
    )

======================================
MIDDLEWARE

Para criar uma validação e permissão para utilizar os serviços, você pode gerar um
middleware para validar o token passado e liberar os serviços.

- Exemplo:

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

É importante criar uma interface para estender o Request do Express e que será 
utilizado na validação do middleare 

    interface AuthRequest extends Request {
        user?: {
            id_usuario: number
            email: string
            nome?: string | null
        }
    }

Após a criação é só "anexar" na requisição para ser validado e token e verificar
se é liberado ou não para o usuário

    // Inserir um novo agente
    app.post('/agentes', **authMiddleware**, async (req: AuthRequest, res: Response) => {


> [!IMPORTANT]   
> É preciso ter o Nodejs na versão 20 pois na 22 há instabilidade com o Prisma.


---