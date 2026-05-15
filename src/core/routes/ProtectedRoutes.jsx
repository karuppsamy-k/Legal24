import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const AdminRoute = () => {
  const { user, role, loading } = useAuth();

  if (loading) return <div className="loading-screen">Loading...</div>;

  return user && role === 'admin' ? <Outlet /> : <Navigate to="/login" replace />;
};

export const AdvocateRoute = () => {
  const { user, role, loading } = useAuth();

  if (loading) return <div className="loading-screen">Loading...</div>;

  return user && role === 'advocate' ? <Outlet /> : <Navigate to="/login" replace />;
};

export const ClientRoute = () => {
  const { user, role, loading } = useAuth();

  if (loading) return <div className="loading-screen">Loading...</div>;

  return user && role === 'client' ? <Outlet /> : <Navigate to="/login" replace />;
};

export const PublicRoute = () => {
  const { user, role, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    // Redirect already logged-in users to their respective dashboards
    if (role === 'admin') return <Navigate to="/admin-dashboard" replace />;
    if (role === 'advocate') return <Navigate to="/advocate-dashboard" replace />;
    if (role === 'client') return <Navigate to="/client-dashboard" replace />;
  }

  return <Outlet />;
};
