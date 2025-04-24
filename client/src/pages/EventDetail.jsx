import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaShareAlt, FaHeart, FaBookmark, FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function EventDetail() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        toast.error('Failed to load event');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleSave = async () => {
    if (!user) {
      toast.error('Please log in to save events');
      return;
    }
    try {
      await axios.post(
        `${API_BASE_URL}/events/save/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      toast.success('Event saved successfully');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to save event');
    }
  };

  const handleInterested = () => {
    toast.info('Marked as interested');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-600">Loading event...</div>;
  }

  if (!event) {
    return <div className="text-center py-10 text-gray-600">Event not found</div>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto px-4 py-8 max-w-7xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side */}
        <div className="space-y-6">
          <motion.h1 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-800">
            {event.name}
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-md"
          >
            <img
              src={event.images[0]}
              alt={`${event.name} main`}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
            {event.images.slice(1).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${event.name} preview ${idx + 2}`}
                className="w-20 h-20 rounded-xl object-cover shadow"
              />
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Save event"
            >
              <FaBookmark className="h-5 w-5" />
              Save
            </button>
            <button
              onClick={handleInterested}
              className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500"
              aria-label="Mark as interested"
            >
              <FaHeart className="h-5 w-5" />
              Interested
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label="Share event"
            >
              <FaShareAlt className="h-5 w-5" />
              Share
            </button>
          </motion.div>
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-2xl shadow-md space-y-4"
          >
            <p className="flex items-center text-gray-700 text-lg">
              <FaCalendarAlt className="mr-3 text-blue-500" />
              {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="flex items-center text-gray-700 text-lg">
              <FaClock className="mr-3 text-yellow-500" />
              {event.time}
            </p>
            <p className="flex items-center text-gray-700 text-lg">
              <FaMapMarkerAlt className="mr-3 text-red-500" />
              {event.location}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="h-96 rounded-2xl overflow-hidden shadow-md">
            <MapContainer
              center={[event.coordinates.lat, event.coordinates.lng]}
              zoom={13}
              className="h-full w-full"
              scrollWheelZoom={false}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[event.coordinates.lat, event.coordinates.lng]}>
                <Popup>{event.location}</Popup>
              </Marker>
            </MapContainer>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default EventDetail;