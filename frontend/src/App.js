import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Menu from './components/Menu';
import NovaSolicitacao from './components/NovaSolicitacao';
import Acompanhamento from './components/Acompanhamento';
import DetalheChamado from './components/DetalheChamado';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>Painel de Solicitações</h1>
                    <Menu />
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<NovaSolicitacao />} />
                        <Route path="/acompanhamento" element={<Acompanhamento />} />
                        <Route path="/chamado/:id" element={<DetalheChamado />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
