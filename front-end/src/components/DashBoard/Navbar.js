import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../context/authSlice';
import { useNavigate } from 'react-router-dom';
import imgPro from "../../images/appLogo.jpg"; 

// Custom hook for handling clicks outside of the dropdown
const useOutsideClick = (ref, onOutsideClick) => {
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onOutsideClick();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [ref, onOutsideClick]);
};

const Dropdown = ({ username, onLogout, onNavigate }) => {
  const dropdownRef = React.useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center space-x-2 focus:outline-none"
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : 'false'}
      >
        <img className="w-8 h-8 rounded-full ring-2 ring-teal-500" src={imgPro} alt="Profile" />
        <span className="hidden sm:block text-white">{username}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-xl rounded-md z-50">
          <a
            href="/profile"
            className="block px-4 py-2 hover:bg-teal-500 rounded-md"
            onClick={(e) => { e.preventDefault(); onNavigate('/profile'); }}
          >
            Profile
          </a>
          <button
            onClick={onLogout}
            className="block w-full text-left px-4 py-2 hover:bg-teal-500 rounded-md"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

const Navbar = ({ username }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/');
  }, [dispatch, navigate]);

  const handleNavigate = useCallback((path) => navigate(path), [navigate]);

  return (
    <nav className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Side - Logo and Title */}
          <div className="flex items-center space-x-4">
            <a href="/dashboard" className="text-2xl font-semibold hover:text-teal-50 transition">
              Habit Tracker
            </a>
            <a href="/dashboard">
              <img src={imgPro} alt="Logo" className="w-12 h-12 object-contain rounded-full" />
            </a>
          </div>

          {/* Right Side - Dropdown */}
          <Dropdown username={username} onLogout={handleLogout} onNavigate={handleNavigate} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
