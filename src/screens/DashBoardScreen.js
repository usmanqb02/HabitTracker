import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ThemeProvider, useTheme } from "../theme/ThemeContext";
import Navbar from "../components/DashBoard/Navbar";
import Sidebar from "../components/DashBoard/Sidebar";
import DashboardOverview from "../components/DashBoard/DashBoard";
import HabitManagement from "../components/DashBoard/HabitManagement";
import Settings from "../components/DashBoard/Settings";
import "../theme/index.css";

const Dashboard = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token && location.pathname !== "/") {
      navigate("/");
    }
  }, [location, navigate]);

  useEffect(() => {
    const section = location.pathname.split("/")[1] || "dashboard";
    setActiveSection(section);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const sectionComponents = {
    dashboard: <DashboardOverview />,
    manageHabits: <HabitManagement />,
    settings: <Settings />,
    profile: <div>Profile Page</div>,
  };

  return (
    <ThemeProvider>
      <div className={`h-screen flex overflow-hidden`}>
        <Sidebar currentPath={activeSection} />
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <Navbar
            username={user ? user.username : "Guest"}
            onLogout={handleLogout}
          />
          <div
            className={`flex-grow overflow-y-auto ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            {sectionComponents[activeSection] || <div>Section Not Found</div>}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
