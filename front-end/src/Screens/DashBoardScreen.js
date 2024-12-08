import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import { ThemeProvider, useTheme } from '../theme/ThemeContext'; 
import Navbar from '../components/DashBoard/Navbar';
import Sidebar from '../components/DashBoard/Sidebar';
import DashboardOverview from '../components/DashBoard/DashBoard';
import HabitManagement from '../components/DashBoard/HabitManagement';
import Tracking from '../components/DashBoard/Tracking';
import Goals from '../components/DashBoard/Goals';
import Settings from '../components/DashBoard/Settings';
import "../theme/index.css"; 

const Dashboard = () => {
  const { theme } = useTheme();
  const location = useLocation(); // Get current route path from location
  const [activeSection, setActiveSection] = useState(location.pathname.split('/')[1] || 'dashboard'); // Default to 'dashboard' if no path

  useEffect(() => {
    setActiveSection(location.pathname.split('/')[1]); // Update active section on route change
  }, [location]);

  const handleLogout = () => {
    console.log('User logged out');
    localStorage.removeItem('token');
    window.location.href = '/'; // Redirect to login/home
  };

  const sectionComponents = {
    dashboard: <DashboardOverview />,
    manageHabits: <HabitManagement />,
    tracking: <Tracking />,
    goals: <Goals />,
    settings: <Settings />,
    profile: <div>Profile Page</div>,
  };

  return (
    <ThemeProvider>
      <div className={`h-screen flex overflow-hidden}`}>
        <Sidebar 
          currentPath={activeSection}
        />
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <Navbar username="Usman" onLogout={handleLogout} />
          <div className={`flex-grow overflow-y-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            {sectionComponents[activeSection] || <div>Section Not Found</div>}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
