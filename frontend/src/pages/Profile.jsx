import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">My Profile</h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>

        <div className="mt-8">
          <h3 className="font-semibold mb-2">Upload Resume</h3>
          <form onSubmit={handleResumeUpload} className="flex items-center gap-3">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResume(e.target.files[0])}
              className="flex-1"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Upload
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
