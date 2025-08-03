import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function UserList() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const api_url = 'http://localhost:3001';

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${api_url}/api/users`);
            const data = await response.json();
            if (response.ok) {
                setUsers(data.data);
            } else {
                throw new Error(data.error || 'Failed to fetch users');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="posts-container">
            <h2>User Management</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Login</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.login}</td>
                            <td>{user.papel === 1 ? 'Admin' : 'User'}</td>
                            <td>{user.status === 1 ? 'Active' : 'Deactivated'}</td>
                            <td>
                                <Link to={`/admin/edit-user/${user.id}`}>Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;
