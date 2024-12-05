// components/Auth/ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom'; // Use Navigate instead of Redirect
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { token } = useAuth();

  return (
    <Route
      {...rest}
      element={token ? <Component /> : <Navigate to="/login" />} // Use element for rendering
    />
  );
};

export default ProtectedRoute;
