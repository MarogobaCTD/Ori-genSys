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
      <td></td>
    </tr>
    <tr>
      <td>03</td>
      <td></td>  
    </tr>
    <tr>
      <td>04</td>
      <td></td>    
    </tr>
  </tbody>
</table>

---
## Implementação da API
Implementação uma API back-end em Node.js + TypeScript + Express que persiste produtos em um banco PostgreSQL. Use Docker/Docker Compose para subir o banco e Prisma para modelagem, migrations e seed. Teste os endpoints com Insomnia.

#### Instruções de execução 

- Baixe o projeto e o abra no VSCode
- Execute todos os comandos abaixo pelo terminal do VSCode
- É preciso ter o Nodejs na versão 20 pois na 22 há instabilidade com o Prisma.

**Instalando o Express e o TypeScript**
- Instalar o Express e o Typescript
npm install express
npm install -D typescript @types/node @types/express tsx
- Iniciar o typescript
npm tsc --init

**Instalando o Docker e o TypeScript**
- Baixar o [![Docker](https://img.shields.io/badge/Docker-257?style=for-the-badge&logo=docker)](https://www.docker.com/) na sua máquina e após instalação, verificar se ela está executando
- Voltar no VSCode e digitar no terminal para ver as versões do Docker e docker-compose:
docker --version
docker-compose --version
- Subir o Docker
docker-compose up -d

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
	
**Visualizar as tabelas pelo Prisma Studio**

npx prisma studio

**Executando o seed com informações para popular o banco**

npx prisma db seed

**Executando o testConnection para ver a API**

npx tsx src/testConnection.ts

**Excutando a API para consumir no Insomnia**

npm run dev

**Instalando o Zod**

Ele é uma biblioteca de validação de dados e tipagem em tempo de excução pelo TS e JS, pode determinar como aquela informação será estruturada, podendo validar o objeto ter a forma e valores válidos.

npm install zod

Instruções:

É preciso criar o schema para o zod realizar a validação e tipagem em tempo de execução

### 🧩 Validação do schema `Agente`
```ts
export const createAgenteSchema = z.object({
  nome: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  nome_Artistico: z.string().min(3, 'O nome artistico deve ter pelo menos 3 caracteres'),
  drt: z.string().min(1, 'DRT não pode ser vazio!'),
  curriculo_Resumido: z.string().min(100, 'Currículo resumido deve ter pelo menos 100 caracteres')
});
```

Nos métodos POST e PUT você pode utilizá-lo para validar

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


> [!IMPORTANT]   
> É preciso ter o Nodejs na versão 20 pois na 22 há instabilidade com o Prisma.


---