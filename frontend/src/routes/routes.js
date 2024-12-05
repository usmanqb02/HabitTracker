// routes/routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Use Routes and Route
import LoginPage from '../pages/LoginPage';
import ProtectedRoute from '../components/Auth/ProtectedRoute';
import Navbar from '../components/Common/Navbar';

const routes = (
  <div>
    <Navbar />
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<ProtectedRoute component={() => <h1>Dashboard</h1>} />} />
    </Routes>
  </div>
);

export default routes;
