import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("userInfo");
    if (!stored) {
      navigate("/login");
      return;
    }
    const parsed = JSON.parse(stored);
    setUser(parsed);
    setFormData({ name: parsed.name, email: parsed.email });
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put("/api/profile", formData, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
      toast.success("Profile updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResumeUpload = async (e) => {
    e.preventDefault();
    if (!resume) return toast.error("Please select a file");
    const formData = new FormData();
    formData.append("resume", resume);
    try {
      await axios.post("/api/profile/resume", formData, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Resume uploaded!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    }
  };

  if (!user) return null;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-photo/abstract-programming-code-icon-laptop-screen-light-blue-low-poly-futuristic-style-technology-background_43780-10083.jpg?semt=ais_hybrid&w=740')",
        }}
      ></div>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 text-white"
        >
          {/* Avatar */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-28 h-28 rounded-full border-4 border-indigo-500 shadow-lg overflow-hidden">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  formData.name || "User"
                )}&background=4f46e5&color=fff`}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="mt-4 text-2xl font-bold">{formData.name}</h2>
            <p className="text-gray-300">{formData.email}</p>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-gray-300 text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-gray-300 text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 font-semibold shadow-lg transition"
            >
              {loading ? "Updating..." : "Update Profile"}
            </motion.button>
          </form>

          {/* Resume Upload */}
          <div className="mt-8">
            <h3 className="font-semibold mb-3">Upload Resume</h3>
            <form
              onSubmit={handleResumeUpload}
              className="flex flex-col sm:flex-row items-center gap-3"
            >
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResume(e.target.files[0])}
                className="flex-1 text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
              />
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 font-semibold shadow-lg transition"
              >
                Upload
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Profile;
