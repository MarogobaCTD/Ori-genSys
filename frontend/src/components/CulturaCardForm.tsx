import React, { useState } from "react";
import type { CulturaCardData } from "../components/CulturaCard";

export type CulturaCardFormData = Omit<CulturaCardData, 'id'>;

interface CulturaCardFormProps {
    onAddAtividade: (atividdae: CulturaCardFormData) => void;
    onClose: () => void;
}

function CulturaCardForm({onAddAtividade, onClose}: CulturaCardFormProps){
    const [nome, setNome] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');
    const [previsao, setPrevisao] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [emExecucao, setEmExecucao] = useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
       
        if (!nome || !descricao || !previsao || !imageUrl){
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const newAtividadeData: CulturaCardFormData = {
            nome,
            descricao,
            previsao,
            imageUrl,
            emExecucao,
        }

        onAddAtividade(newAtividadeData);

        // Limpar os campos após a submissão
        setNome('');
        setDescricao('');
        setPrevisao('');
        setImageUrl('');
        setEmExecucao(false);
        
        onClose();        
    };

    return (
            <div className="card mb-4 p-3 shadow-sm">            
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="descricao" className="form-label">Descrição</label>
                    <textarea
                        className="form-control"
                        id="descricao"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                        rows={3}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="previsao" className="form-label">Previsão</label>
                    <input                            
                        className="form-control"
                        id="previsao"
                        value={previsao}
                        onChange={(e) => setPrevisao(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="imageUrl" className="form-label">URL da Imagem</label>
                    <input
                        type="text"
                        className="form-control"
                        id="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="ex: images/meuproduto.png"
                        required
                    />
                </div>
                {<div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="emExecucao"
                        checked={emExecucao}
                        onChange={(e) => setEmExecucao(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="emExecucao">Atividade em Execução?</label>
                </div>
                }
                <button type="submit" className="btn btn-primary w-100">Adicionar Atividade</button>
            </form>
        </div>
    );
}

export default CulturaCardForm;