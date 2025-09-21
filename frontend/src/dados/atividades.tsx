import { useState } from "react";
import type { CulturaCardData } from "../components/CulturaCard";

export const [atividades, setAtividades] = useState<CulturaCardData[]>([
        {
            id: 1,
            nome: "Cadastro de Usuários",
            descricao: "Realizará o cadastro dos usuários que trabalharam com o sistema.",
            previsao: "Agosto/2025",
            imageUrl: "./src/icons/usuarios.png",
            emExecucao: true, // Este terá um badge de destaque
        },
        {
            id: 2,
            nome: "Cadastro dos Agentes",
            descricao: "Realizará o cadastro dos agentes culturais (artistas) os quais poderão posteriormente cadastrar a sua função e seu portifólio.",
            previsao: "Setembro/2025",
            imageUrl: "./src/icons/agentes.png",
        },
        {
            id: 3,
            nome: "Cadastro dos Proponentes",
            descricao: "Realizará o cadastro dos Proponentes que trabalharam com os projetos aprovados para realizar a administração e acompanhamento dos projetos.",
            previsao: "Outubro/2025",
            imageUrl: "./src/icons/projetos.png",
        },
        {
            id: 4,
            nome: "Cadastro de Atividades",
            descricao: "Permitirá ao contratado registrar as atividades do projeto documentando com fotos, vídeos e resumo da atividade no dia e horários agendados.",
            previsao: "Setembro/2025",
            imageUrl: "./src/icons/atividades.png",
        },        
        {
            id: 5,
            nome: "Processo de Pagamento",
            descricao: "Processará os pagamentos dos artistas conforme as datas de pagamentos com a aprovação do relatório de atividades por período trabalhado.",
            previsao: "Outubro/2025",
            imageUrl: "./src/icons/pagamentos.png",            
        },
        {
            id: 6,
            nome: "Dashboard dos Projetos",
            descricao: "Permitirá acompanhar o desenvolvimento dos projetos verificando possíveis atrasos, demandas criadas, pagamentos e outras atividades.",
            previsao: "Outubro/2025",
            imageUrl: "./src/icons/dashboard.png",
        },
    ]);