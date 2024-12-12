import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaBars } from "react-icons/fa"; // Importing icons from react-icons
import imgPro from "../../images/appLogo.jpg";

const useOutsideClick = (ref, onOutsideClick) => {
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onOutsideClick();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
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
        aria-expanded={isOpen ? "true" : "false"}
      >
        <img
          className="w-8 h-8 rounded-full ring-2 ring-teal-500"
          src={imgPro}
          alt="Profile"
        />
        <span>{username}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-xl rounded-md z-50">
          <a
            href="/profile"
            className="block px-4 py-2 hover:bg-teal-500 rounded-md"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("/profile");
            }}
          >
            <FaUser className="inline-block mr-2" />
            Profile
          </a>
          <button
            onClick={onLogout}
            className="block w-full text-left px-4 py-2 hover:bg-teal-500 rounded-md"
          >
            <FaSignOutAlt className="inline-block mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

const Navbar = ({ username, onLogout, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <nav className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="text-2xl font-semibold hover:text-teal-50 transition"
            >
              Habit Tracker
            </Link>
            <Link to="/dashboard">
              <img
                src={imgPro}
                alt="Logo"
                className="w-12 h-12 object-contain rounded-full"
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Dropdown
              username={username}
              onLogout={onLogout}
              onNavigate={onNavigate}
            />
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="text-white focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <FaBars className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col items-center bg-gradient-to-r from-cyan-500 to-teal-500 p-4">
            <Link
              to="/profile"
              className="block px-4 py-2 text-white rounded-md hover:bg-teal-500"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("/profile");
              }}
            >
              <FaUser className="inline-block mr-2" />
              Profile
            </Link>
            <button
              onClick={onLogout}
              className="block w-full text-left px-4 py-2 text-white rounded-md hover:bg-teal-500"
            >
              <FaSignOutAlt className="inline-block mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
