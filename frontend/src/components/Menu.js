import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
    return (
        <nav>
            <Link to="/">Nova Solicitação</Link>
            <Link to="/acompanhamento">Acompanhamento</Link>
        </nav>
    );
}

export default Menu;
