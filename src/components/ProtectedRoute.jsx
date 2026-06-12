import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireAdmin }) => {
  const { currentUser, userData } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // Jika data user sudah ada, cek apakah dia sudah diapprove
  if (userData && userData.isApproved === false) {
    return <Navigate to="/menunggu-persetujuan" />;
  }

  if (requireAdmin && userData && !userData.isAdmin) {
    return <Navigate to="/" />; // Redirect non-admins trying to access admin pages
  }

  return children;
};

export default ProtectedRoute;
