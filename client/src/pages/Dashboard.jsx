import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import EventCard from '../components/EventCard';
import { toast } from 'react-toastify';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    description: '',
    category: '',
  });
  const [images, setImages] = useState([]);
  const [coordinates, setCoordinates] = useState({ lat: 51.505, lng: -0.09 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/events`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setEvents(res.data.filter((event) => event.createdBy._id === user.id));
      } catch (err) {
        toast.error('Failed to fetch events');
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchUserEvents();
  }, [user]);

  const LocationPicker = () => {
    useMapEvents({
      click: (e) => {
        setCoordinates(e.latlng);
      },
    });
    return <Marker position={[coordinates.lat, coordinates.lng]} />;
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const eventData = { ...form, images, coordinates };
      const res = await axios.post('http://localhost:5000/api/events', eventData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setEvents([...events, res.data]);
      toast.success('Event created successfully');
      setForm({ name: '', date: '', time: '', location: '', description: '', category: '' });
      setImages([]);
      setCoordinates({ lat: 51.505, lng: -0.09 });
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setEvents(events.filter((event) => event._id !== id));
      toast.success('Event deleted successfully');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to delete event');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
  
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User Dashboard</h1>

      {/* Create Event Form */}
      <section className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Event</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Event Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                aria-required="true"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
                aria-required="true"
              >
                <option value="">Select Category</option>
                <option value="Music">Music</option>
                <option value="Sports">Sports</option>
                <option value="Tech">Tech</option>
                <option value="Food">Food</option>
                <option value="Food">MeetUp</option>
                <option value="Food">Opening</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
                aria-required="true"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Time</label>
              <input
                type="time"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                required
                aria-required="true"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                required
                aria-required="true"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
                aria-required="true"
                rows="4"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Event Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              aria-label="Upload event images"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Preview ${idx + 1}`}
                  className="w-20 h-20 object-cover rounded"
                />
              ))}
            </div>
          </div>

          <div className="h-96 rounded-lg overflow-hidden shadow-md">
          <MapContainer
            center={[23.8103, 90.4125]} // Defult Coordinates for Dhaka, Bangladesh
            zoom={10}
            className="h-full w-full"
            scrollWheelZoom={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationPicker />
          </MapContainer>
        </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Event'}
          </button>
        </form>
      </section>

      {/* My Events */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Events</h2>
        {loading ? (
          <p className="text-gray-600">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-gray-600">No events created yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event._id} className="relative">
                <EventCard event={event} />
                <button
                  className="mt-2 w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  onClick={() => handleDelete(event._id)}
                  aria-label={`Delete event ${event.name}`}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;