import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireAdmin, allowedRoles }) => {
  const { currentUser, userData, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // Bisa diganti dengan spinner
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Jika data user sudah ada, cek apakah dia sudah diapprove
  if (userData && userData.isApproved === false) {
    return <Navigate to="/menunggu-persetujuan" replace />;
  }

  if (requireAdmin && userData && !userData.isAdmin) {
    return <Navigate to="/" replace />; // Redirect non-admins trying to access admin pages
  }

  // Specific role check
  if (allowedRoles && userData && !allowedRoles.includes(userData.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
