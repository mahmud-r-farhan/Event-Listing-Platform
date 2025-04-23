import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import EventCard from '../components/EventCard';
import { toast } from 'react-toastify';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

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

  useEffect(() => {
    const fetchUserEvents = async () => {
      const res = await axios.get('http://localhost:5000/api/events', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setEvents(res.data.filter((event) => event.createdBy._id === user.id));
    };
    fetchUserEvents();
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
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const eventData = {
        ...form,
        images,
        coordinates
      };
      const res = await axios.post('http://localhost:5000/api/events', eventData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setEvents([...events, res.data]);
      toast.success('Event created');
      setForm({ name: '', date: '', time: '', location: '', description: '', category: '' });
      setImages([]);
      setCoordinates({ lat: 51.505, lng: -0.09 });
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to create event');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setEvents(events.filter((event) => event._id !== id));
      toast.success('Event deleted');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to delete event');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
      <h2 className="text-2xl font-bold mb-4">Create Event</h2>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
        {/* Image Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Event Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <div className="flex gap-2 mt-2">
            {images.map((img, idx) => (
              <img key={idx} src={img} alt="preview" className="w-20 h-20 object-cover rounded" />
            ))}
          </div>
        </div>

        {/* Map Location Picker */}
        <div className="h-[400px] rounded-lg overflow-hidden">
          <MapContainer
            center={[coordinates.lat, coordinates.lng]}
            zoom={13}
            className="h-full"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationPicker />
          </MapContainer>
        </div>

        {/* Existing form fields */}
        <input
          type="text"
          placeholder="Event Name"
          className="border p-2 w-full"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="date"
          className="border p-2 w-full"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
        <input
          type="time"
          className="border p-2 w-full"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Location"
          className="border p-2 w-full"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          className="border p-2 w-full"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <select
          className="border p-2 w-full"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          <option value="Music">Music</option>
          <option value="Sports">Sports</option>
          <option value="Tech">Tech</option>
          <option value="Food">Food</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Event
        </button>
      </form>
      <h2 className="text-2xl font-bold mb-4">My Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {events.map((event) => (
          <div key={event._id}>
            <EventCard event={event} />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mt-2"
              onClick={() => handleDelete(event._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;