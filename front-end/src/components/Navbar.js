import React, { useState } from 'react';
import profileImg from "../images/appLogo.jpg";

const Navbar = ({ username, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <nav className="bg-teal-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-extrabold text-white">
              Habbit Tracker
            </a>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Username Display */}
            <span className="hidden sm:block text-white">{`Hello, ${username}`}</span>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <img
                  className="w-8 h-8 rounded-full border-2 border-white"
                  src={profileImg}
                  alt="Profile"
                />
                <span className="hidden sm:block text-white">{username}</span>
              </button>
              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-md z-50">
                  <a
                    href="/profile"
                    className="block px-4 py-2 hover:bg-teal-100"
                  >
                    Profile
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-teal-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
