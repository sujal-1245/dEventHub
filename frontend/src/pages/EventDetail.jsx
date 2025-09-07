import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await axios.get(`/api/events/${id}`);
        setEvent(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching event:", err);
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-600">Loading event...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-600">Event not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6 max-w-4xl bg-white rounded-2xl shadow-lg p-8">
        {event.image && (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-64 object-cover rounded-xl mb-6"
          />
        )}
        <h1 className="text-3xl font-bold mb-4 text-gray-800">{event.title}</h1>
        <p className="text-sm text-indigo-600 mb-1">{event.type}</p>
        <p className="text-sm text-gray-500 mb-6">{event.date}</p>
        <p className="text-gray-700 leading-relaxed mb-8">{event.desc}</p>

        <div className="flex justify-between items-center">
          <Link
            to="/events"
            className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Back to Events
          </Link>
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Apply Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
