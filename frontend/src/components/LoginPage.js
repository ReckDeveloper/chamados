import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();
    const api_url = 'http://localhost:3001';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const url = isRegistering ? `${api_url}/api/register` : `${api_url}/api/login`;
        const payload = isRegistering ? { name, login, password } : { login, password };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                let errorMessage = data.error || 'An error occurred';
                if (isRegistering && errorMessage.includes('Login already exists')) {
                    errorMessage = 'This login is already taken. Please choose another one.';
                }
                throw new Error(errorMessage);
            }

            if (isRegistering) {
                alert('Registration successful! Please log in.');
                setIsRegistering(false);
                setName('');
                setLogin('');
                setPassword('');
            } else {
                auth.login(data.user);
                navigate('/');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="form-container">
            <h2>{isRegistering ? 'Register' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
                {isRegistering && (
                    <div>
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                )}
                <div>
                    <label>Login</label>
                    <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
            </form>
            <button onClick={() => setIsRegistering(!isRegistering)} style={{ marginTop: '10px', background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}>
                {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
            </button>
        </div>
    );
}

export default LoginPage;
