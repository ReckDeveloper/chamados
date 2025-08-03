import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Menu() {
    const { user } = useAuth();

    return (
        <nav>
            <Link to="/">Nova Solicitação</Link>
            <Link to="/acompanhamento">Acompanhamento</Link>
            {user && user.papel === 1 && (
                <Link to="/admin">Novo Usuário</Link>
            )}
        </nav>
    );
}

export default Menu;
