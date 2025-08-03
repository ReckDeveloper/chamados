import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AdminRoute = ({ children }) => {
    const { user } = useAuth();

    // First check if user is logged in, then check if they are an admin (papel === 1)
    if (!user) {
        return <Navigate to="/login" />;
    }

    if (user.papel !== 1) {
        // Redirect to home page if not an admin
        return <Navigate to="/" />;
    }

    return children;
};

export default AdminRoute;
