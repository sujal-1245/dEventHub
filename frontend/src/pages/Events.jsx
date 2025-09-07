import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaStar, FaShareAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [applyLink, setApplyLink] = useState("");
  const nav = useNavigate();

  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/events");
        if (Array.isArray(data)) setEvents(data);
        else if (data && Array.isArray(data.events)) setEvents(data.events);
        else setEvents([]);
      } catch (err) {
        console.error("Error fetching events:", err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleApplyClick = (link) => {
    if (!user) {
      setApplyLink(link);
      setShowLoginModal(true);
    } else {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  const handleShareClick = (link) => {
    navigator.clipboard.writeText(link);
    toast.success("Event link copied to clipboard! 📋");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 
                    dark:from-gray-950 dark:via-gray-900 dark:to-black 
                    transition-colors duration-500 py-12 px-6">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-center mb-12 text-black dark:text-white 
                       flex items-center justify-center gap-2">
          <FaStar className="text-yellow-500" />
          Explore Events
        </h1>

        {loading ? (
          <p className="text-center text-black/70 dark:text-white/70">
            Loading events...
          </p>
        ) : events.length === 0 ? (
          <p className="text-center text-black/70 dark:text-white/70">
            No events available.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <motion.div
                key={event._id}
                whileHover={{ scale: 1.03 }}
                className="rounded-2xl p-6 shadow-lg hover:shadow-2xl transition 
                           bg-white/60 dark:bg-white/10 backdrop-blur-xl 
                           border border-white/40 dark:border-white/10
                           flex flex-col justify-between h-full"
              >
                <div>
                  {event.image && (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                  )}
                  <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
                    {event.title}
                  </h2>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">
                    {event.type}
                  </p>
                  <p className="text-sm text-black/70 dark:text-white/70 mb-3">
                    {event.date}
                  </p>
                  <p className="text-black/80 dark:text-white/80 mb-4 line-clamp-3">
                    {event.desc}
                  </p>
                </div>

                <div className="flex justify-between mt-4">
                  {/* Share Button */}
                  <button
                    onClick={() => handleShareClick(event.link)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium
                               bg-black/10 dark:bg-white/10 text-black dark:text-white
                               hover:bg-black/20 dark:hover:bg-white/20 transition"
                  >
                    <FaShareAlt className="text-base" />
                    Share
                  </button>

                  {/* Apply Button */}
                  <button
                    onClick={() => handleApplyClick(event.link)}
                    className="px-4 py-2 rounded-xl font-medium shadow-md
                               bg-gradient-to-r from-yellow-400 to-yellow-500 
                               text-black hover:from-yellow-500 hover:to-yellow-600
                               transition"
                  >
                    Apply 🚀
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="rounded-2xl p-8 w-full max-w-md relative shadow-2xl
                         bg-white/70 dark:bg-white/10 backdrop-blur-xl 
                         border border-white/30 dark:border-white/10"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full 
                           hover:bg-black/10 dark:hover:bg-white/10 transition"
              >
                <FaTimes className="text-black dark:text-white" />
              </button>
              <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
                Please login to apply
              </h2>
              <p className="text-black/70 dark:text-white/70 mb-6">
                You need to be logged in to apply for this event.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="px-4 py-2 rounded-xl font-medium 
                             bg-black/10 dark:bg-white/10 text-black dark:text-white
                             hover:bg-black/20 dark:hover:bg-white/20 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => nav("/login")}
                  className="px-4 py-2 rounded-xl font-medium shadow-md
                             bg-gradient-to-r from-yellow-400 to-yellow-500 
                             text-black hover:from-yellow-500 hover:to-yellow-600 transition"
                >
                  Login
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Events;
