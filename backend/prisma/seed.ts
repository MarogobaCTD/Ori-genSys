// prisma/seed.ts
import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Iniciando seed do banco de dados...')

    // Limpa a tabela antes de popular (útil em desenvolvimento)
    await prisma.agente.deleteMany()

    // Cria agentes de exemplo
    const agentes = await prisma.agente.createMany({
        data: [
            {
                nome: "Marcelo Roberto Gomes Barbosa",
                nome_Artistico: "Marcelo Barbosá",
                drt: "123456",
                curriculo_reumido: "Ator, diretor e gestor administrativo. Bacharelado em Artes Cênicas pela Faculdade Dulcina de Moraes – FADM em 2012. Foi contemplado em 2014 com o FAC para a produção e elaboração do espetáculo “Faça-se Luz”, o qual foi dirigido por Valdeci Moreira e Ricardo César. Como Ator na FADM participei das produções: “Gota d’ Água” Jonathan Andrade, “Amores Difíceis” Direção: Adriano e Fernando Guimarães, “Vilarejo das Almas” Direção: Jonathan Andrade e “Roberto Zucco” Direção: Tullio Guimarães. Fui um dos fundadores do Grupo Caras e Máscaras em Itabira – MG realizando os trabalhos entre 1995 e 2001: seleção e estudo de textos para as montagens de peças e saraus: Sarau Poético: A Rosa e=mc2 (2000-2001) participante do 26º e 27º Festival de Inverno de Itabira, Poesias de Drummond (2000) no 2º Fórum Nacional Itabira Século 21, A Casa do Tempo Perdido (1999-2001) no 25º Festival de Inverno de Itabira (Estreia). Ator no grupo Cenarte entre 1995 e 1999 com a realização: Sarau Poético (1999) no 1º Fórum Nacional Itabira Século 21 – Centenário Drummond, Quem Roubou meu futuro (1996) na 9ª Mostra Estadual de Teatro, Guaranésia – MG e Saraus de Poesias (1995-1998) pela Fundação Carlos Drummond de Andrade (Itabira – MG). Participação em festivais de teatro pela FETEMIG durante os anos de 1995 a 2000."                
            },
            {
                nome: "Jullya Graciella",
                nome_Artistico: "Jullya Graciela",
                drt: "222222",
                curriculo_reumido: "Atriz, diretora, produtora, manipuladora de bonecos, gestora, coordenadora, desenhista e arte educadora. Mestranda em Artes da Cena na Universidade Federal de Goiás (UFG) e Bacharela em Interpretação Teatral na Faculdade de Artes Dulcina de Moraes. Foi presidenta e assistente administrativo na Semente Companhia de Teatro por 5 anos. Integrante e co-fundadora do Coletivo Ori-gens. Atuou como atriz: “A Morta” Direção: Ricardo César (2003); “De Morte” Marco Augusto (2004); “Gota d’ Água” Jonathan Andrade (2010); “Morte e Vida Severina/ A Saga de um Retirante” Valdeci Moreira e Ricardo César (2010); “Amores Difíceis” Direção: Adriano e Fernando Guimarães (2011); “Vilarejo das Almas” Direção: Jonathan Andrade (2011) “Roberto Zucco” Direção: Tullio Guimarães (2012); “Os Meninos Verdes” Direção: Marco Augusto (2011); “A Princesa de Bambuluá” Direção: Marco Augusto (2012); “O Menino Maluquinho” Direção: Marco Augusto (2011); “Infinito Vazio” Valdeci Moreira e Ricardo César (2013); “ A revolta dos Livros” Valdeci Moreira e Ricardo César (2014); “Faça-se Luz” Valdeci Moreira e Ricardo César (2016); “Macunaíma” Valdeci Moreira e Ricardo César (2018). Leituras dramáticas: “Águas Emendadas”, “Os Grilos” Direção: Valdeci Moreira e Ricardo César, na II BIENAL do livro: “Eles não usam black tie” Direção: Valdeci Moreira e Ricardo César e “A Resistência” Tullio Guimarães. Participação de oficinas: Dramaturgia, técnicas de animação de bonecos; Commédia Dell arte; Teatro do Oprimido; Iniciação Teatral; Confecção e manipulação de Bonecos e Máscaras; Curso de TV e Cinema com Fátima Toledo; Oficina de teatro o ator amador com Humberto Pedrancini. Assistente de Produção: 2º FESTIBRA 2011 - Festival de Teatro para Infância de Brasília; 3º FESTINECO 2012 e 2014- Festival de Teatro de Bonecos do Gama; ESPETACULIM 2012 - Pequenos espetáculos de grande qualidade. Iluminadora: “O Prazer da sua Companhia” Direção: Mário Luz; “Bendita Dica” Direção: Mafá Nogueira (Premiado melhor espetáculo infantil no SESC Candango de 2018); “O longe” Direção: Patrícia Barros; “Festa Baile Dionisíaco” – 15 edições, “O Segredo” Direção Mafá Nogueira; “Assalto a Cor Armada” Direção: Jullya Graciela; “O Violinista Mosca Morta” Direção: Mafa Nogueira; “Alvo” Direção: Ricardo César; “A Legítima História Verdadeira” Direção: Patrícia Barros. Direção dos espetáculos “Assalto a Cor Armada” (2017) e “Um Sopro de Vida” (2019). Assistente de iluminação do Projeto MALUBÁ - Teatro para meninas negras. Arte educadora das oficinas: “Interpretação teatral no projeto Viveiro Cultural (2011 e 2013)”; Interpretação teatral no Espaço Semente (2012 a 2018); “Dança ragga jam para criança na EC 413 Sul (2016)”; Oficina de teatro pela perspectiva do processo de criação do espetáculo Faça-se Luz (2016); “Oficina de formação básica em técnica de iluminação para LGBTQ+ do projeto LACRE - Abrindo Perspectiva para Inclusão Econômica e Social (2019)”; “Criação de Personagem no Espaço Lábios da Lua (2022)”; “1° Luz Negra: A iluminação cênica como ferramenta de identidade racial (2023)-Ganhador do Prêmio Sesc+Cultura- Categoria: Inovação e originalidade”; “Oficineira de Teatro no projeto Tô Ligado na Energia da Neoenergia (2023 e 2024)”. Secretária Teatral do 1° Festival de Teatro Verônica Moreno 2023."                

            },
            {
                nome: "Daniel Landim",
                nome_Artistico: "Daniel Landim",
                drt: "333333",
                curriculo_reumido: "Daniel Landim é ator e trabalha no meio cultural do Distrito Federal. Foi integrante da Semente Cia de Teatro, grupo fundado em 2009 pelo diretor Valdeci Moreira De Sousa e que desenvolve a prática teatral-periférica no Gama-DF e entorno. De 2015 a 2017 integrou como ator e dançarino o Grupo Cultural Obará, coletivo que desenvolve a prática da linguagem cênica utilizando elementos da nossa cultura afro-brasileiras. Na Semente Cia De Teatro participou como ator das seguintes montagens: “Macunaíma” (2017), obra homônima de Mario de Andrade, “Morte e Vida Severina” (2018) do aclamado autor João Cabral De Melo Neto e “ATOR” (2019), monólogo sobre a vida e obra de Antonin Artaud com mais de 20 apresentações e que em 2019, com uma adaptação do espetáculo, ganhou o Festival ¼ De Cena como melhor cena curta pelo júri técnico e popular. E foi diretor juntamente com Jullya Graciella do espetáculo “Sopro De Vida” (2019). Como ator independente, desenvolve pesquisas na área da atuação, além de já ter trabalho com artistas da cidade, tais como Humberto Pedrancini, Jonathan Andrade, Chico Santana, Ana Luiza Bellacosta, Pietra Souza, Cristiane Sobral, Fernanda Jacob, Tatiana Carvalhedo, Miriam Virna, Bruno Quixote, Zé Regino etc."                

            },
            {
                nome: "Carlos William",
                nome_Artistico: "Carlos William",
                drt: "444444",
                curriculo_reumido: "Ator nos Espetáculos: Macunaíma, Direção de Valdeci Moreira, 2017.  Os Três Porquinhos: a história que você nunca ouviu, Direção de Valdeci Moreira, 2016. Leitura dramática Um Apólogo - Adaptação do texto de Machado de Assis, Direção de Sara Tavares, 2017. Alvo, Direção de Ricardo César, janeiro de 2020. Morte e Vida Severina, 2021, Direção de Valdeci Moreira e Ricardo César, Macunaíma, 2021, Direção de Valdeci Moreira e Ricardo César e Infinito Vazio, 2021, Direção de Valdeci Moreira e Ricardo César, como parte da Mostra Literatura em Cena e da Mostra Semente de Teatro, respectivamente.  Autor em projeto “A arte de desenhar e escrever: dando asas à imaginação”, organização do Núcleo de Altas Habilidades e Superdotação da Secretaria de Educação do Gama - GDF, 2011; projeto “Semeando… Altas Habilidades”, organização do Núcleo de Altas Habilidades e Superdotação de Secretaria de Educação do Gama - GDF, 2014. Autor de “Miragem” - coletânea de poesias autorais, selecionada no projeto do Poema ao Livro e publicada pela Editora Avá, sob o pseudônimo Carlos Selva. Autor no livro “Do Poema ao Livro”, coletânea com organização de Geovane César dos Santos e Natália Cristina Anicieto publicada pela Editora Avá, sob o pseudônimo Carlos Selva. Dramaturgo nos Espetáculos: Os Três Porquinhos: a história que você nunca ouviu, 2016. Um Sopro de Vida, direção de Jullya Graciela e Daniel Landim, novembro de 2019. Cursos: Cursos de Interpretação Teatral (Método de Constantin Stanislavski), história do teatro, expressão corporal (Método de M. Checkov) e técnica vocal para o ator, ministrados pelos professores e diretores, Valdeci Moreira e Ricardo César – Iniciado em janeiro de 2016 e finalizado em novembro de 2017. Curso Marketing Digital: explorando os conceitos - Plataforma Alura de Tecnologia. Carga horária de 08 horas. Curso de Capacitação para Empreendedores Culturais - Usina de Projetos Culturais - Conclusão em 2019 Curso Produção Cultural - Edição 2023 - Lúmina - Universidade Federal do Rio Grande do Sul. Carga horária 12 horas. Curso de Social Media - Plataforma Alura de Tecnologia. Carga Horária de 08 horas.Curso Capacitação de Agentes Culturais em Editorial - Lúmina - Universidade Federal do Rio Grande do Sul. Carga horária 12 horas. Oficinas: Oficina de Iniciação Teatral com Valdeci Moreira, 2017. Oficina de percussão e ritmo com Felipe Fiuza do grupo Patubatê, 2017. Oficina de Preparação Vocal com Cláudia Costa, 2017. Outras funções artísticas: Musicista no espetáculo Os Três Porquinhos, 2016. Musicista e compositor musical no espetáculo Macunaíma, 2017, 2018 e 2021. Artista gráfico no espetáculo Um Sopro de Vida, 2020. Assistente de bilheteria no espetáculo Um Sopro de Vida, 2019. Assistente de bilheteria no espetáculo Ator, 2019. Artista Gráfico do espetáculo Ator, 2020. Musicista no espetáculo Alvo, 2020. Assessoria de Imprensa do Projeto Luz Negra: a iluminação cênica como ferramenta de identidade racial, 2023."                
            },
            {
                nome: "Bruna Nayara",
                nome_Artistico: "Bruna Nayara",
                drt: "555555",
                curriculo_reumido: "Graduanda em Teoria, Crítica e História da Arte na UnB. Atuou como atriz por 11 anos na Semente Companhia de Teatro. Participou de oficinas como: Formação profissional do Ator/método, Oficina de Iniciação teatral, O teatro do oprimido, ministrada por Valdeci Moreira, Oficina de teatro o ator amador com Humberto Pedrancini, SESC Dramaturgia – Leituras em Cena e Oficina de Teatro de Formas Animadas. Iniciou como atriz em 2011 e desde então participei das peças “...doces lembranças de nós mesmo” direção: Valdeci Moreira e supervisão: Ricardo César, “Gang – Ou um certo Romeu e Julieta” projeto Teatro na Escola Fundação Athos Bulcão, “A saga de um Retirante” (Operadora de Luz), Leitura Dramática da peça “Eles não usam Black-Tie” pela II Bienal Brasil do Livro e da Leitura em e Leitura Dramática da peça “Os Grilos” pelo SESC Dramaturgia Leituras em Cena, Infinito Vazio na Mostra de Teatro do Espaço Semente e Infinito Vazio na 2ª Mostra Semente Literatura em Cena - 2021. E foi assistente de produção da Mostra de Teatro do Espaço Semente e da 2ª Mostra Semente Literatura em Cena em 2021, Workshop o Ator Extraordinário ministrado por Humberto Pedrancini em 2023."                
            }
        ]
    })

    const idAgente = await prisma.agente.findFirst({
        where: { drt: "123456" },
    })

    if (idAgente) {
        await prisma.projetos.create({
            data: {
            titulo: "Helena Hiena: A História da Garota-Hiena",
            descricao: "A montagem e apresentação do espetáculo 'Helena Hiena: A História da Garota-Hiena' traz a história de uma menina negra que busca aprender a lidar com as suas emoções e através da sua imaginação ela encontra nos animais as suas referências. Com foco nessa história, pretende-se difundir e conscientização o protagonismo de uma menina negra e sua família no âmbito literário e nas artes cênicas no Distrito Federal (DF). ",
            edital: "FAC 2/2025",
            valor: 200000.00,
            inicio: new Date("2026-01-01"),
            fim: new Date("2026-11-30"),
            id_Proponente: idAgente.id_Agente,
            },
        })
    }

    console.log(`✅ ${agentes.count} agentes criados com sucesso!`)
}

main()
    .catch((e) => {
        console.error('❌ Erro ao popular o banco:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })