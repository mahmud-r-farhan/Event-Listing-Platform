import { Link } from 'react-router-dom';

function EventCard({ event }) {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-bold">{event.name}</h3>
      <p>{new Date(event.date).toLocaleDateString()}</p>
      <p>{event.time}</p>
      <p>{event.location}</p>
      <Link to={`/events/${event._id}`} className="text-blue-500">View Details</Link>
    </div>
  );
}

export default EventCard;