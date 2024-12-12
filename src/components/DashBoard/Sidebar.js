import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const SidebarItem = ({ icon, text, onClick, isSidebarOpen, isActive }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-3 text-lg text-gray-200 p-2 rounded-md transition-all duration-200 w-full 
      ${
        isActive
          ? "bg-teal-800"
          : "hover:bg-gradient-to-r hover:from-teal-500 hover:to-cyan-500"
      }`}
    aria-label={text}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d={icon}
      />
    </svg>
    {isSidebarOpen && <span className="font-semibold">{text}</span>}
  </button>
);

const menuItems = [
  { icon: "M4 6h9M9 12h16M4 18h16", text: "Dashboard", path: "dashboard" },
  {
    icon: "M12 6v6l4 2M12 6l-4 2",
    text: "Manage Habits",
    path: "manageHabits",
  },
  { icon: "M12 8v8M8 12h8", text: "Settings", path: "settings" },
];

const Sidebar = ({ currentPath }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = useCallback(
    () => setIsSidebarOpen((prev) => !prev),
    []
  );

  const handleNavigate = (path) => {
    navigate(`/${path}`);
  };

  return (
    <div
      className={`flex ${
        isSidebarOpen ? "w-65" : "w-21"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white shadow-lg h-screen p-4">
        {/* Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="text-white p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-teal-300"
          aria-label="Toggle Sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`h-6 w-6 ${
              !isSidebarOpen && "rotate-180"
            } transition-transform duration-300`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Sidebar Menu Items */}
        <ul className="space-y-6">
          {menuItems.map((item) => (
            <li key={item.path}>
              <SidebarItem
                icon={item.icon}
                text={item.text}
                isSidebarOpen={isSidebarOpen}
                onClick={() => handleNavigate(item.path)} // Navigate to the path
                isActive={currentPath === item.path} // Highlight active item
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
