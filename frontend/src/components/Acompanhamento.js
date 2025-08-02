import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Acompanhamento() {
    const [chamados, setChamados] = useState([]);
    const [error, setError] = useState(null);
    const api_url = 'http://localhost:3001/post/';

    useEffect(() => {
        fetchChamados();
    }, []);

    const fetchChamados = async () => {
        setError(null); // Reset error state
        try {
            const response = await fetch(api_url + 'read.php');
            const data = await response.json();
            console.log('API Response:', data); // Log the raw API response

            if (!response.ok) {
                // If server responded with an error code, use the message from JSON
                throw new Error(data.message || 'Something went wrong');
            }

            if (data.data) {
                setChamados(data.data.map(chamado => ({...chamado, isEditing: false})));
            } else {
                console.log('No data found in response, setting chamados to empty array.');
                setChamados([]);
            }
        } catch (error) {
            console.error("Failed to fetch chamados:", error);
            setError(error.message);
            setChamados([]);
        }
    };

    return (
        <div className="posts-container">
            <h2>Acompanhamento de Solicitações</h2>

            {error && (
                <div style={{ border: '2px solid red', color: 'red', margin: '10px', padding: '10px' }}>
                    <h3>Error</h3>
                    <p>{error}</p>
                </div>
            )}

            {chamados.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chamados.map((chamado) => (
                            <tr key={chamado.id}>
                                <td>
                                    <Link to={`/chamado/${chamado.id}`}>{chamado.titulo}</Link>
                                </td>
                                <td>{chamado.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                !error && <p>Nenhum chamado encontrado.</p>
            )}
        </div>
    );
}

export default Acompanhamento;
