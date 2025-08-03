import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function DetalheChamado() {
    const [chamado, setChamado] = useState(null);
    const [status, setStatus] = useState('');
    const [previsaoEntrega, setPrevisaoEntrega] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const api_url = 'http://localhost:3001';

    useEffect(() => {
        const fetchChamado = async () => {
            try {
                const response = await fetch(`${api_url}/api/post/read_one.php?id=${id}`);
                const result = await response.json();
                if (result.data) {
                    setChamado(result.data);
                    setStatus(result.data.status);
                    setPrevisaoEntrega(result.data.previsao_entrega || '');
                }
            } catch (error) {
                console.error("Failed to fetch chamado:", error);
            }
        };
        fetchChamado();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await fetch(`${api_url}/api/post/update.php`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, previsao_entrega: previsaoEntrega, status }),
            });
            alert('Chamado atualizado com sucesso!');
            navigate('/acompanhamento');
        } catch (error) {
            console.error("Failed to update chamado:", error);
            alert('Falha ao atualizar o chamado.');
        }
    };

    if (!chamado) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="form-container">
            <h2>{chamado.titulo}</h2>
            <p><strong>Solicitante:</strong> {chamado.nome}</p>
            <p><strong>Setor:</strong> {chamado.setor}</p>
            <p><strong>Categoria:</strong> {chamado.categoria}</p>
            <p><strong>Justificativa:</strong> {chamado.justificativa}</p>
            <p><strong>Métrica de Sucesso:</strong> {chamado.metrica}</p>
            <p><strong>Descrição:</strong> {chamado.descricao}</p>
            
            <form onSubmit={handleUpdate}>
                <div>
                    <label>Status</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                        <option value="Pendente">Pendente</option>
                        <option value="Em análise">Em análise</option>
                        <option value="Em desenvolvimento">Em desenvolvimento</option>
                        <option value="Aguardando homologação">Aguardando homologação</option>
                        <option value="Concluído">Concluído</option>
                        <option value="Cancelado">Cancelado</option>
                    </select>
                </div>
                <div>
                    <label style={{ color: !chamado || status === 'Pendente' ? '#999' : 'inherit' }}>Data Prevista para Homologação</label>
                    <input
                        type="date"
                        value={previsaoEntrega}
                        onChange={(e) => setPrevisaoEntrega(e.target.value)}
                        disabled={!chamado || status === 'Pendente'}
                    />
                </div>
                <button type="submit">Salvar Alterações</button>
            </form>
        </div>
    );
}

export default DetalheChamado;
