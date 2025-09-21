-- CreateTable
CREATE TABLE "public"."agente" (
    "id_Agente" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "nome_Artistico" VARCHAR(255) NOT NULL,
    "drt" VARCHAR(30) NOT NULL,
    "curriculo_Resumido" TEXT NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agente_pkey" PRIMARY KEY ("id_Agente")
);

-- CreateTable
CREATE TABLE "public"."projetos" (
    "id_Projeto" SERIAL NOT NULL,
    "titulo" VARCHAR(255) NOT NULL,
    "descricao" TEXT NOT NULL,
    "edital" VARCHAR(255) NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "inicio" DATE NOT NULL,
    "fim" DATE NOT NULL,
    "id_Proponente" INTEGER NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projetos_pkey" PRIMARY KEY ("id_Projeto")
);

-- CreateTable
CREATE TABLE "public"."notasFiscais" (
    "id_Nota" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "serie" INTEGER NOT NULL,
    "data_Emissao" DATE NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "situacao" TEXT NOT NULL,
    "nf_paga" BOOLEAN NOT NULL DEFAULT false,
    "id_Agente" INTEGER NOT NULL,
    "id_Projeto" INTEGER NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notasFiscais_pkey" PRIMARY KEY ("id_Nota")
);

-- AddForeignKey
ALTER TABLE "public"."projetos" ADD CONSTRAINT "projetos_id_Proponente_fkey" FOREIGN KEY ("id_Proponente") REFERENCES "public"."agente"("id_Agente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notasFiscais" ADD CONSTRAINT "notasFiscais_id_Agente_fkey" FOREIGN KEY ("id_Agente") REFERENCES "public"."agente"("id_Agente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notasFiscais" ADD CONSTRAINT "notasFiscais_id_Projeto_fkey" FOREIGN KEY ("id_Projeto") REFERENCES "public"."projetos"("id_Projeto") ON DELETE RESTRICT ON UPDATE CASCADE;
