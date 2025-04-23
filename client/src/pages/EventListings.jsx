import { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';

function EventListings() {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      const params = {};
      if (category) params.category = category;
      if (location) params.location = location;
      const res = await axios.get('http://localhost:5000/api/events', { params });
      setEvents(res.data);
    };
    fetchEvents();
  }, [category, location]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Events</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by location"
          className="border p-2 mr-2"
          onChange={(e) => setLocation(e.target.value)}
        />
        <select
          className="border p-2"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Music">Music</option>
          <option value="Sports">Sports</option>
          <option value="Tech">Tech</option>
          <option value="Food">Food</option>
          <option value="MeetUp">Meetup</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default EventListings;