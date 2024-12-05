// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import LoginPage from './pages/LoginPage';
//import Dashboard from './pages/Dashboard';
//import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} /> */}
      </Routes>
    </AuthProvider>
  );
}

export default App;
