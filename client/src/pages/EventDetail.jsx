import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import {
  FaShareAlt,
  FaHeart,
  FaBookmark,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function EventDetail() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        toast.error('Failed to load event');
      }
    };
    fetchEvent();
  }, [id]);

  const handleSave = async () => {
    try {
      await axios.post(`${API_BASE_URL}/events/save/${id}`, {}, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.success('Event saved');
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

  if (!event) return <div className="text-center py-10 text-gray-600">Loading event...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8 max-w-6xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Side */}
        <div className="space-y-6">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-800"
          >
            {event.name}
          </motion.h1>

          {/* Main Image */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-md"
          >
            <img
              src={event.images[0]}
              alt={`${event.name} main`}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Thumbnails */}
          <div className="flex flex-wrap gap-3">
            {event.images.slice(1).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${event.name} preview ${idx + 2}`}
                className="w-24 h-24 rounded-xl object-cover shadow"
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-4">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              <FaBookmark className="h-5 w-5" />
              Save
            </button>
            <button
              onClick={handleInterested}
              className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition"
            >
              <FaHeart className="h-5 w-5" />
              Interested
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
            >
              <FaShareAlt className="h-5 w-5" />
              Share
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
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
          </div>

          {/* Map */}
          <div className="h-[400px] rounded-2xl overflow-hidden shadow-lg">
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
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default EventDetail;
