import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg"
    >
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold">EventHub</Link>
            <div className="hidden md:flex space-x-6">
              <Link to="/events" className="hover:text-blue-200 transition">Events</Link>
              <Link to="/categories" className="hover:text-blue-200 transition">Categories</Link>
              <Link to="/calendar" className="hover:text-blue-200 transition">Calendar</Link>
            </div>
          </motion.div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="hover:text-blue-200 transition">Dashboard</Link>
                <button 
                  onClick={handleLogout}
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-x-4">
                <Link to="/login" className="hover:text-blue-200 transition">Login</Link>
                <Link 
                  to="/register" 
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </motion.header>
  );
}

export default Header;