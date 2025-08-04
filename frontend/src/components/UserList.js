import React from 'react';
import { Link } from 'react-router-dom';

function UserList({ users }) {
    return (
        <div className="posts-container">
            <h2>User Management</h2>
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
                    {users && users.map((user) => (
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
