// src/App.js
import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
//import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
         <Route path="/login" element={<LoginPage />} />
         {/* <Route path="/register" element={<RegisterPage />} /> */}
    </Routes>
    </AuthProvider>
  );
};

export default App;
