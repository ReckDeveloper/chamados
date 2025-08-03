import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditUser() {
    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [papel, setPapel] = useState(2);
    const [status, setStatus] = useState(1);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const api_url = 'http://localhost:3001';

    useEffect(() => {
        const fetchUser = async () => {
            // This reuses the get all users endpoint and filters.
            // In a larger app, a dedicated /api/users/:id GET endpoint would be better.
            try {
                const response = await fetch(`${api_url}/api/users`);
                const data = await response.json();
                if (response.ok) {
                    const userToEdit = data.data.find(u => u.id === parseInt(id, 10));
                    if (userToEdit) {
                        setName(userToEdit.name);
                        setLogin(userToEdit.login);
                        setPapel(userToEdit.papel);
                        setStatus(userToEdit.status);
                    }
                } else {
                    throw new Error(data.error || 'Failed to fetch user data');
                }
            } catch (err) {
                setError(err.message);
            }
        };
        fetchUser();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await fetch(`${api_url}/api/users/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, login, papel, status }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to update user');
            }

            setSuccess('User updated successfully!');
            setTimeout(() => navigate('/admin'), 1500); // Redirect back to user list after a short delay
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="form-container">
            <h2>Edit User: {name}</h2>
            <form onSubmit={handleUpdate}>
                <div>
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Login</label>
                    <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} required />
                </div>
                <div>
                    <label>Papel (Role)</label>
                    <select value={papel} onChange={(e) => setPapel(parseInt(e.target.value, 10))}>
                        <option value={1}>Admin</option>
                        <option value={2}>User</option>
                    </select>
                </div>
                <div>
                    <label>Status</label>
                    <select value={status} onChange={(e) => setStatus(parseInt(e.target.value, 10))}>
                        <option value={1}>Active</option>
                        <option value={0}>Deactivated</option>
                    </select>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <button type="submit">Update User</button>
            </form>
        </div>
    );
}

export default EditUser;
