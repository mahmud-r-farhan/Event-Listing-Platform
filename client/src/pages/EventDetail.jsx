import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// React Icons replacements
import { FaShareAlt, FaHeart, FaBookmark, FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

// API base URL from .env
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
    toast.info('Marked as interested'); // Example
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  if (!event) return <div>Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto p-4 max-w-6xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl font-bold text-gray-800"
          >
            {event.name}
          </motion.h1>

          <div className="relative h-96 rounded-xl overflow-hidden">
            <img 
              src={event.images[0]} 
              alt={event.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex space-x-4">
            {event.images.slice(1).map((img, idx) => (
              <img 
                key={idx}
                src={img}
                alt={`${event.name} ${idx + 2}`}
                className="w-24 h-24 rounded-lg object-cover"
              />
            ))}
          </div>

          <div className="flex space-x-4">
            <button onClick={handleSave} className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              <FaBookmark className="h-5 w-5" />
              <span>Save</span>
            </button>
            <button onClick={handleInterested} className="flex items-center space-x-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition">
              <FaHeart className="h-5 w-5" />
              <span>Interested</span>
            </button>
            <button onClick={handleShare} className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
              <FaShareAlt className="h-5 w-5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="space-y-4">
              <p className="flex items-center text-gray-600">
                <FaCalendarAlt className="h-5 w-5 mr-2" />
                {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="flex items-center text-gray-600">
                <FaClock className="h-5 w-5 mr-2" />
                {event.time}
              </p>
              <p className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="h-5 w-5 mr-2" />
                {event.location}
              </p>
            </div>
          </div>

          <div className="h-[400px] rounded-xl overflow-hidden">
            <MapContainer
              center={[event.coordinates.lat, event.coordinates.lng]}
              zoom={13}
              className="h-full w-full"
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
