import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

function EventDetail() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await axios.get(`http://localhost:5000/api/events/${id}`);
      setEvent(res.data);
    };
    fetchEvent();
  }, [id]);

  const handleSave = async () => {
    try {
      await axios.post(`http://localhost:5000/api/events/save/${id}`, {}, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.success('Event saved');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to save event');
    }
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> {event.time}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Category:</strong> {event.category}</p>
      <p><strong>Description:</strong> {event.description}</p>
      {user && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          onClick={handleSave}
        >
          Save Event
        </button>
      )}
    </div>
  );
}

export default EventDetail;