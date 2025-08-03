import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
function NovaSolicitacao() {
    const [users, setUsers] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [setor, setSetor] = useState('');
    const { user } = useAuth();
    // Initialize nome with the logged-in user's name
    const [nome, setNome] = useState(user ? user.name : '');
    const [categoria, setCategoria] = useState('');
    const [justificativa, setJustificativa] = useState('');
    const [metrica, setMetrica] = useState('');
    const [descricao, setDescricao] = useState('');
    const api_url = 'http://localhost:3001';

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${api_url}/api/users`);
                const result = await response.json();
                if (result.data) {
                    setUsers(result.data);
                }
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };
        fetchUsers();
    }, [api_url]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${api_url}/api/post/create.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ titulo, setor, nome, categoria, justificativa, metrica, descricao, previsao_entrega: '', status: 'em análise' }),
            });
            const result = await response.json();
            console.log(result);
            setTitulo('');
            setSetor('');
            // Reset nome to the logged-in user's name after submission
            setNome(user ? user.name : '');
            setCategoria('');
            setJustificativa('');
            setMetrica('');
            setDescricao('');
            alert('Solicitação enviada com sucesso!');
        } catch (error) {
            console.error("Failed to create chamado:", error);
        }
    };

    return (
        <div className="form-container">
            <h2>Criar Nova Solicitação de TI</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Seu Nome</label>
                    <select value={nome} onChange={(e) => setNome(e.target.value)} required>
                        <option value="">Selecione um nome...</option>
                        {users.map(u => (
                            <option key={u.id} value={u.name}>{u.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Seu Setor</label>
                    <select value={setor} onChange={(e) => setSetor(e.target.value)} required>
                        <option value="">Selecione...</option>
                        <option value="SETOR1">SETOR1</option>
                        <option value="SETOR2">SETOR2</option>
                    </select>
                </div>
                <div>
                    <label>Categoria da Solicitação</label>
                    <select value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
                        <option value="">Selecione...</option>
                        <option value="Problema Técnico">Problema Técnico</option>
                        <option value="Novo Recurso">Novo Recurso</option>
                        <option value="Melhora de Processo">Melhora de Processo</option>
                        <option value="Relatório/Dados">Relatório/Dados</option>
                        <option value="Acesso a Sistema">Acesso a Sistema</option>
                    </select>
                </div>
                <div>
                    <label>Justificativa/Impacto</label>
                    <select value={justificativa} onChange={(e) => setJustificativa(e.target.value)} required>
                        <option value="">Selecione...</option>
                        <option value="Impede o Trabalho">Impede o Trabalho</option>
                        <option value="Atrasa o Trabalho">Atrasa o Trabalho</option>
                        <option value="Risco Financeiro">Risco Financeiro</option>
                        <option value="Risco de Segurança">Risco de Segurança</option>
                        <option value="Melhora a Eficiência">Melhora a Eficiência</option>
                    </select>
                </div>
                <div>
                    <label>Métrica de Sucesso</label>
                    <select value={metrica} onChange={(e) => setMetrica(e.target.value)} required>
                        <option value="">Selecione...</option>
                        <option value="Redução de Tempo">Redução de Tempo</option>
                        <option value="Redução de Erros">Redução de Erros</option>
                        <option value="Aumento de Receita">Aumento de Receita</option>
                        <option value="Melhora a Satisfação (Cliente/Usuário)">Melhora a Satisfação (Cliente/Usuário)</option>
                    </select>
                </div>
                <div>
                    <label>Título da Solicitação</label>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Descrição Detalhada (Opcional)</label>
                    <textarea
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit">Enviar Solicitação</button>
            </form>
        </div>
    );
}

export default NovaSolicitacao;
