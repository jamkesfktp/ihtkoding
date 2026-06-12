import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireAdmin }) => {
  const { currentUser, userData } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && userData && !userData.isAdmin) {
    return <Navigate to="/" />; // Redirect non-admins trying to access admin pages
  }

  return children;
};

export default ProtectedRoute;
