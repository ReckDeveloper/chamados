import React, { useState } from 'react';

function NovaSolicitacao() {
    const [titulo, setTitulo] = useState('');
    const [setor, setSetor] = useState('');
    const [nome, setNome] = useState('');
    const [categoria, setCategoria] = useState('');
    const [justificativa, setJustificativa] = useState('');
    const [metrica, setMetrica] = useState('');
    const [descricao, setDescricao] = useState('');
    const api_url = 'http://localhost:3001/post/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(api_url + 'create.php', {
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
            setNome('');
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
                        <option value="">Selecione...</option>
                        <option value="Nome 1">Nome 1</option>
                        <option value="Nome 2">Nome 2</option>
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
