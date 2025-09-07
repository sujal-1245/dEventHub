import axios from "axios";

// Recommend events
export const recommendEvents = async (req, res) => {
  try {
    const response = await axios.post("http://localhost:8000/recommend", req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Analyze resume
export const analyzeResume = async (req, res) => {
  try {
    const response = await axios.post("http://localhost:8000/resume", req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Chatbot
export const chatbotResponse = async (req, res) => {
  try {
    const response = await axios.post("http://localhost:8000/chatbot", req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
