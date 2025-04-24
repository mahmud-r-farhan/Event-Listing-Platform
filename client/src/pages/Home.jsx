import { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';
import { motion } from 'framer-motion';

function Home() {
  const [events, setEvents] = useState([]);
  const [categories] = useState(['Music', 'Sports', 'Tech', 'Food', 'Meetup', 'Others']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/events`);
        setEvents(res.data);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

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
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 sm:p-12 rounded-2xl shadow-lg mb-12"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
          Discover Local Events
        </h1>
        <p className="mt-4 text-base sm:text-lg md:text-xl">
          Find exciting events happening near you!
        </p>
      </motion.div>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Browse by Category</h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-3"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              variants={itemVariants}
              className="px-4 py-2 bg-white text-blue-600 border border-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* Events Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Upcoming Events</h2>
        {loading ? (
          <p className="text-gray-600">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-gray-600">No events available.</p>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {events.slice(0, 6).map((event) => (
              <motion.div key={event._id} variants={itemVariants}>
                <EventCard event={event} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}

export default Home;