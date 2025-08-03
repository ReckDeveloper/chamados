import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { useAuth } from './hooks/useAuth';
import Menu from './components/Menu';
import NovaSolicitacao from './components/NovaSolicitacao';
import Acompanhamento from './components/Acompanhamento';
import DetalheChamado from './components/DetalheChamado';
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPanel from './components/AdminPanel';
import AdminRoute from './components/AdminRoute';

function App() {
    const { user, logout } = useAuth();

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>Painel de Solicitações</h1>
                    {user && <Menu />}
                    {user && <button onClick={logout} style={{ marginLeft: 'auto', background: '#f44336', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>Logout</button>}
                </header>
                <main>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route 
                            path="/" 
                            element={
                                <ProtectedRoute>
                                    <NovaSolicitacao />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/acompanhamento" 
                            element={
                                <ProtectedRoute>
                                    <Acompanhamento />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/chamado/:id" 
                            element={
                                <ProtectedRoute>
                                    <DetalheChamado />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/admin" 
                            element={
                                <AdminRoute>
                                    <AdminPanel />
                                </AdminRoute>
                            } 
                        />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
