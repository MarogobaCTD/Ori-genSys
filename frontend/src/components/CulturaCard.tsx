// 1. Definindo a Interface de Props com TypeScript
export interface CulturaCardData {
    id: number;
    nome: string;
    descricao: string;
    previsao: string;
    imageUrl: string;
    emExecucao?: boolean; //Opcional
}

// 2. Componente usando tipagem TypeScript direta
interface  CulturaCardProps
{
    atividade: CulturaCardData; 
} 

function CulturaCard({ atividade }: CulturaCardProps)
{    
    return (
        <div className="col-lg-4 mb-4">
            <div className={atividade.emExecucao ? "card border border-2 border-danger" : "card h-100 border"}>
                {atividade.emExecucao && (
                    <div className="position-center top-0 end-0 p-2">
                        <span className="card-header text-center text-white bg-danger">Primeiro a ser implementado</span>
                    </div>
                )}

                <img
                    src={atividade.imageUrl}
                    className="card-img-top"
                    alt={atividade.nome}
                    style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body text-center">
                    <h5 className="card-title">{atividade.nome}</h5>
                    <p className="card-text mb-3">{atividade.descricao}</p>
                    {atividade.emExecucao && (<p className="card-text text-danger fw-bold fs-5 mb-3">
                        Desenv. (mês): {atividade.previsao} 
                    </p>)}
                    <a href="#" className="btn btn-primary">
                        Ver Detalhes
                    </a>
                </div>
            </div>
        </div>
    );
}

export default CulturaCard;