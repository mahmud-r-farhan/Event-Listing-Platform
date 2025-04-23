import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-6">Oops! Page not found.</p>
        <Link to="/" className="btn-primary">
          Go Home
        </Link>
      </motion.div>
    </div>
  );
}

export default NotFound;
