import { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaUserCircle } from 'react-icons/fa';

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { path: '/events', label: 'Events' },
    { path: '/categories', label: 'Categories' },
    { path: '/calendar', label: 'Calendar' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
          EventHub
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`font-medium transition-colors duration-200 ${
                location.pathname === path ? 'text-primary' : 'text-gray-700 hover:text-primary'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-primary">
                <FaUserCircle className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="btn-primary"
              >
                Logout
              </motion.button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-primary font-medium">
                Login
              </Link>
              <Link to="/register" className="btn-primary">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-700 hover:text-primary focus:outline-none"
        >
          {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200 px-4 pb-4"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`block py-2 font-medium transition-colors ${
                    location.pathname === path ? 'text-primary' : 'text-gray-700 hover:text-primary'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              ))}

              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block py-2 text-gray-700 hover:text-primary font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="mt-2 btn-primary w-full"
                  >
                    Logout
                  </motion.button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block py-2 text-gray-700 hover:text-primary font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary w-full mt-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
