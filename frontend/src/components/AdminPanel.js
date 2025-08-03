import React, { useState } from 'react';

function AdminPanel() {
    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [papel, setPapel] = useState(2); // Default to 'user'
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const api_url = 'http://localhost:3001';

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await fetch(`${api_url}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, login, password, papel }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create user');
            }

            setSuccess(`User "${name}" created successfully!`);
            setName('');
            setLogin('');
            setPassword('');
            setPapel(2);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="form-container">
            <h2>Admin Panel - Create User</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Login</label>
                    <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label>Papel (Role)</label>
                    <select value={papel} onChange={(e) => setPapel(parseInt(e.target.value, 10))}>
                        <option value={1}>Admin</option>
                        <option value={2}>User</option>
                    </select>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <button type="submit">Create User</button>
            </form>
        </div>
    );
}

export default AdminPanel;
