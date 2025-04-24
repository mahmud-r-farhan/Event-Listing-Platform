import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendar, FaClock, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';
import PropTypes from 'prop-types';

function EventCard({ event }) {
  const cardVariants = {
    hover: { y: -8, transition: { duration: 0.3 } },
    initial: { y: 0 },
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      initial="initial"
      className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
      role="article"
      aria-labelledby={`event-${event._id}`}
    >
      <div className="relative">
        <img
          src={event.images[0]}
          alt={event.name}
          className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-pink-500 hover:bg-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          aria-label="Add to favorites"
        >
          <FaHeart className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="p-4 sm:p-5 space-y-3">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-2">
          <h3
            id={`event-${event._id}`}
            className="text-lg sm:text-xl font-semibold text-gray-800 line-clamp-2"
          >
            {event.name}
          </h3>
          <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs sm:text-sm font-medium rounded-full">
            {event.category}
          </span>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <p className="flex items-center gap-2">
            <FaCalendar className="w-4 h-4 text-gray-400" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </p>
          <p className="flex items-center gap-2">
            <FaClock className="w-4 h-4 text-gray-400" />
            <span>{event.time}</span>
          </p>
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="w-4 h-4 text-gray-400" />
            <span className="line-clamp-1">{event.location}</span>
          </p>
        </div>

        <Link
          to={`/events/${event._id}`}
          className="block text-center py-2 px-4 border-2 border-blue-500 text-blue-500 font-medium rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
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