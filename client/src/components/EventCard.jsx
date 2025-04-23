import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendar, FaClock, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';
import PropTypes from 'prop-types';

function EventCard({ event }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card overflow-hidden group"
    >
      <div className="relative">
        <img 
          src={event.images[0]} 
          alt={event.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-pink-500 hover:bg-white transition-colors"
          >
            <FaHeart className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">
            {event.name}
          </h3>
          <span className="px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full">
            {event.category}
          </span>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <p className="flex items-center space-x-2">
            <FaCalendar className="w-4 h-4 text-gray-400" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </p>
          <p className="flex items-center space-x-2">
            <FaClock className="w-4 h-4 text-gray-400" />
            <span>{event.time}</span>
          </p>
          <p className="flex items-center space-x-2">
            <FaMapMarkerAlt className="w-4 h-4 text-gray-400" />
            <span className="line-clamp-1">{event.location}</span>
          </p>
        </div>

        <Link 
          to={`/events/${event._id}`}
          className="block mt-4 text-center py-2 border-2 border-primary text-primary font-medium rounded-lg
            hover:bg-primary hover:text-white transition-colors duration-200"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}

EventCard.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default EventCard;