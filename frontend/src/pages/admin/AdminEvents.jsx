import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    type: "",
    date: "",
    desc: "",
    image: "",
    link: "",
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
  const API_URL = `${import.meta.env.VITE_NODE_BACKEND_URL}/api/events`;

  const fetchEvents = async () => {
    try {
      const { data } = await axios.get(API_URL, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (Array.isArray(data)) setEvents(data);
      else if (Array.isArray(data?.events)) setEvents(data.events);
      else setEvents([]);
    } catch (err) {
      console.error("[AdminEvents] Fetch error:", err);
      setEvents([]);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const openAddModal = () => {
    setSelectedEvent(null);
    setForm({ title: "", type: "", date: "", desc: "", image: "", link: "" });
    setShowModal(true);
  };

  const openEditModal = (event) => {
    setSelectedEvent(event);
    setForm({ ...event });
    setShowModal(true);
  };

  const openDeleteModal = (id) => {
    setDeleteEventId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!deleteEventId) return;
    try {
      await axios.delete(`${API_URL}/${deleteEventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowDeleteModal(false);
      setDeleteEventId(null);
      fetchEvents();
    } catch (err) {
      console.error("[AdminEvents] Delete error:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (selectedEvent) {
        await axios.put(`${API_URL}/${selectedEvent._id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(API_URL, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setForm({ title: "", type: "", date: "", desc: "", image: "", link: "" });
      setSelectedEvent(null);
      setShowModal(false);
      fetchEvents();
    } catch (err) {
      console.error("[AdminEvents] Submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Manage Events
        </h1>
        <button
          onClick={openAddModal}
          className="px-5 py-2 bg-indigo-600 text-white rounded-full flex items-center gap-2 hover:bg-indigo-700 transition"
        >
          <FaPlus /> Add Event
        </button>
      </div>

      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center">
            No events found.
          </p>
        ) : (
          events.map((ev) => (
            <motion.div
              key={ev._id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden flex flex-col hover:shadow-2xl transition"
            >
              {ev.image && (
                <img
                  src={ev.image}
                  alt={ev.title}
                  className="w-full h-44 object-cover"
                />
              )}
              <div className="p-5 flex-1 flex flex-col">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {ev.title}
                </h2>
                <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-1">
                  {ev.type}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mt-3 flex-1">
                  {ev.desc}
                </p>
                <p className="text-xs text-gray-400 mt-2">{ev.date}</p>
              </div>
              <div className="flex gap-2 p-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => openEditModal(ev)}
                  className="flex-1 p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition flex justify-center items-center gap-1"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => openDeleteModal(ev._id)}
                  className="flex-1 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex justify-center items-center gap-1"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
<AnimatePresence>
  {showModal && (
    <motion.div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-sky_blue-500 dark:bg-blue_green-800 rounded-2xl w-full max-w-lg relative shadow-2xl flex flex-col overflow-hidden"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        {/* Close Button */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-selective_yellow-500 hover:bg-selective_yellow-600 transition"
        >
          <FaTimes className="text-white" />
        </button>

        {/* Title */}
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-prussian_blue-900 dark:text-sky_blue-100 px-6 pt-6">
          {selectedEvent ? "Edit Event" : "Add Event"}
        </h2>

        {/* Form */}
        <form className="flex flex-col space-y-3 px-6 pb-6 max-h-[80vh] overflow-y-auto" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-3 rounded-lg border border-prussian_blue-700 focus:ring-2 focus:ring-ut_orange-500"
            required
          />
          <input
            type="text"
            placeholder="Type"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full p-3 rounded-lg border border-prussian_blue-700 focus:ring-2 focus:ring-ut_orange-500"
            required
          />
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full p-3 rounded-lg border border-prussian_blue-700 focus:ring-2 focus:ring-ut_orange-500"
            required
          />
          <input
            type="url"
            placeholder="Link"
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
            className="w-full p-3 rounded-lg border border-prussian_blue-700 focus:ring-2 focus:ring-ut_orange-500"
            required
          />
          <textarea
            placeholder="Description"
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            className="w-full p-3 rounded-lg border border-prussian_blue-700 focus:ring-2 focus:ring-ut_orange-500"
            rows={4}
            required
          />

          {/* Image Tabs */}
          <div className="flex gap-2">
            <button
              type="button"
              className={`flex-1 py-2 rounded-lg font-semibold transition ${
                form.imageTab === "link"
                  ? "bg-prussian_blue-600 text-white"
                  : "bg-sky_blue-200 text-prussian_blue-900"
              }`}
              onClick={() => setForm({ ...form, imageTab: "link" })}
            >
              Paste Link
            </button>
            <button
              type="button"
              className={`flex-1 py-2 rounded-lg font-semibold transition ${
                form.imageTab === "upload"
                  ? "bg-prussian_blue-600 text-white"
                  : "bg-sky_blue-200 text-prussian_blue-900"
              }`}
              onClick={() => setForm({ ...form, imageTab: "upload" })}
            >
              Upload Image
            </button>
          </div>

          {form.imageTab === "link" ? (
            <input
              type="url"
              placeholder="Image URL"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="w-full p-3 rounded-lg border border-prussian_blue-700 focus:ring-2 focus:ring-ut_orange-500"
            />
          ) : (
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                if (!e.target.files?.[0]) return;
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onloadend = () => setForm({ ...form, image: reader.result });
                reader.readAsDataURL(file);
              }}
              className="w-full p-3 rounded-lg border border-prussian_blue-700 focus:ring-2 focus:ring-ut_orange-500"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-ut_orange-500 hover:bg-ut_orange-600 text-white rounded-lg font-semibold transition flex justify-center items-center gap-2 mt-2"
          >
            {selectedEvent ? <FaEdit /> : <FaPlus />}
            {selectedEvent ? "Update Event" : "Add Event"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Confirm Delete
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Are you sure you want to delete this event? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirmed}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
