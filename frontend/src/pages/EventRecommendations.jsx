import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";

const SKILL_OPTIONS = [
  "Python", "JavaScript", "HTML", "CSS", "React", "Node.js",
  "Machine Learning", "Data Science", "UI/UX", "SQL"
];

const INTEREST_OPTIONS = [
  "Hackathon", "Web Development", "AI/ML",
  "Blockchain", "Open Source", "Cybersecurity",
  "Internship", "Contest"
];

const EventRecommendations = () => {
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [experience, setExperience] = useState("beginner");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const rawURL = import.meta.env.VITE_ML_BACKEND_URL || "";
  const mlBackendURL = rawURL.replace(/\/+$/, "");

  const toggleSelection = (list, setList, value) => {
    if (list.includes(value)) {
      setList(list.filter((v) => v !== value));
    } else {
      setList([...list, value]);
    }
  };

  const fetchRecommendations = async () => {
    if (skills.length === 0 && interests.length === 0) return;
    setLoading(true);

    const normalizedPayload = {
      skills: skills.map((s) => s.toLowerCase().trim()),
      interests: interests.map((i) => i.toLowerCase().trim()),
      experience_level: experience.toLowerCase().trim(),
    };

    console.log("📡 Sending request to backend:", normalizedPayload);

    try {
      const res = await axios.post(`${mlBackendURL}/recommend`, normalizedPayload);
      console.log("✅ Backend raw response:", res.data);
      setRecommendations(res.data.events || []); // ✅ FIX
    } catch (err) {
      console.error("❌ Error fetching recommendations:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black transition-colors duration-500 py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white flex justify-center items-center gap-3">
            <Sparkles className="text-blue-600 dark:text-blue-400 animate-pulse" />
            Smart Event Recommendations
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg">
            Tailored hackathons, contests, and internships just for you ✨
          </p>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-3xl shadow-2xl p-10 mb-14 border border-gray-200 dark:border-gray-700"
        >
          {/* Skills */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-lg">
              Select Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {SKILL_OPTIONS.map((skill) => (
                <motion.button
                  key={skill}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleSelection(skills, setSkills, skill)}
                  className={`px-5 py-2 rounded-full border text-sm font-medium transition-all shadow-sm ${
                    skills.includes(skill)
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-700 shadow-blue-500/40"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {skill}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-lg">
              Select Interests
            </h3>
            <div className="flex flex-wrap gap-3">
              {INTEREST_OPTIONS.map((interest) => (
                <motion.button
                  key={interest}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleSelection(interests, setInterests, interest)}
                  className={`px-5 py-2 rounded-full border text-sm font-medium transition-all shadow-sm ${
                    interests.includes(interest)
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white border-green-700 shadow-green-500/40"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {interest}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-lg">
              Experience Level
            </h3>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <motion.button
            onClick={fetchRecommendations}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-7 py-3 rounded-xl shadow-lg shadow-blue-500/30 transition flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : "🚀 Get Recommendations"}
          </motion.button>
        </motion.div>

        {/* Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.map((e, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all p-6 flex flex-col justify-between"
            >
              <div>
                <a
                  href={e.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {e.title}
                </a>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  📍 {e.location} <br />
                  ⏰ {e.submission_deadline}
                </div>
              </div>
              {e.thumbnail && (
                <img
                  src={e.thumbnail}
                  alt={e.title}
                  className="mt-4 rounded-lg w-full h-40 object-cover"
                />
              )}
            </motion.div>
          ))}
        </div>

        {!loading && recommendations.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600 dark:text-gray-400 mt-14 text-lg"
          >
            No recommendations yet. Try selecting your skills and interests ✨
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default EventRecommendations;
