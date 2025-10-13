import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Redirect to unauthorized page or their respective dashboard
    return (
      <Navigate
        to={
          user.role === 'admin'
            ? '/admin'
            : user.role === 'agent'
            ? '/agent'
            : '/dashboard'
        }
        replace
      />
    );
    // return <Navigate to={user.role === 'admin' ? '/admin' || user.role === 'agent' ? '/agent' : '/dashboard'} replace />;
  }
  
  return children;
};

export default ProtectedRoute;