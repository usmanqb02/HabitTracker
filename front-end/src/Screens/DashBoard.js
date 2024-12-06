import React from 'react';
import Navbar from '../components/Navbar.js';

const Dashboard = () => {
  const handleLogout = () => {
    // Example logout logic
    console.log('User logged out');
    localStorage.removeItem('token'); // Clear token or user session data
    window.location.href = '/'; // Redirect to login/home
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar Component */}
      <Navbar username="JohnDoe" onLogout={handleLogout} />

      {/* Dashboard Content */}
      <div className="flex-grow bg-gray-100 p-8">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="text-gray-600">This is your dashboard. Start adding content here!</p>
      </div>
    </div>
  );
};

export default Dashboard;
