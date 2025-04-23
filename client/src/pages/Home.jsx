import { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';

function Home() {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState(['Music', 'Sports', 'Tech', 'Food']);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/events`);
      setEvents(res.data);
    };
    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-blue-600 text-white p-8 rounded-lg mb-8">
        <h1 className="text-4xl font-bold">Discover Local Events</h1>
        <p className="mt-2">Find exciting events happening near you!</p>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <div className="flex space-x-4">
          {categories.map((category) => (
            <button
              key={category}
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => {/* Filter by category */}}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {events.slice(0, 6).map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default Home;