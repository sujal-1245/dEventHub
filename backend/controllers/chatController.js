import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const chatController = async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
      { inputs: message },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Hugging Face returns an array of generated texts
    const botReply = response.data[0]?.generated_text || "Sorry, I didn't get that.";

    res.json({ response: botReply });
  } catch (err) {
    console.error("Hugging Face API error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to get response from Hugging Face API" });
  }
};
