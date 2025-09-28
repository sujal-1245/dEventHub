import React, { useState, useRef, useEffect } from "react";
import {
  FaRobot,
  FaTimes,
  FaArrowDown,
  FaTrash,
  FaPaperPlane,
  FaUserCircle,
} from "react-icons/fa";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const Chatbot = () => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const rawURL = import.meta.env.VITE_ML_BACKEND_URL || "";
  const mlBackendURL = rawURL.replace(/\/+$/, "");

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (autoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen, autoScroll]);

  const handleScroll = () => {
    const el = messagesContainerRef.current;
    if (!el) return;
    const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 40;
    setAutoScroll(isAtBottom);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setIsTyping(true);

    try {
      const { data } = await axios.post(`${mlBackendURL}/chat`, {
        message: userMessage,
      });

      const botMessage = data.response;
      setMessages((prev) => [...prev, { sender: "bot", text: botMessage }]);
    } catch (err) {
      console.error("Chatbot error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Oops! Something went wrong." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem("chatHistory");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        whileHover={{ scale: 1.15, rotate: 8 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-5 right-5 bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-600 text-white p-5 rounded-full shadow-[0_0_25px_rgba(99,102,241,0.8)] z-50 flex items-center justify-center transition-all animate-pulse hover:animate-none"
        title="Chat with us"
      >
        <FaRobot size={26} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: -45 }}
            exit={{ opacity: 0, scale: 0.8, y: 150 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            className="fixed bottom-20 right-5 w-[22rem] md:w-[28rem] backdrop-blur-xl bg-white/90 border border-gray-300 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.25)] z-50 overflow-hidden flex flex-col h-[80vh]"
            role="dialog"
            aria-label="EventHub Chatbot"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 via-blue-600 to-gray-900 text-white px-5 py-3 font-semibold shadow-lg">
              <span className="flex items-center gap-2 text-lg tracking-wide">
                <FaRobot className="animate-pulse" /> Career Assistant
              </span>
              <div className="flex items-center gap-4">
                <button
                  onClick={clearChat}
                  className="hover:text-gray-200 transition"
                  title="Clear chat"
                >
                  <FaTrash />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:text-gray-200 transition"
                  title="Close chat"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={messagesContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-4 flex flex-col gap-4 relative"
            >
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex items-end gap-2 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "bot" && (
                    <FaRobot className="text-indigo-600 text-xl mt-auto" />
                  )}
                  <div
                    className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-md text-sm md:text-base whitespace-pre-wrap break-words relative group ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-br-sm"
                        : "bg-white/90 text-gray-900 border border-gray-200 rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                    <span className="absolute opacity-0 group-hover:opacity-40 transition-all duration-300 w-full h-full top-0 left-0 rounded-2xl bg-gradient-to-r from-transparent to-white"></span>
                  </div>
                  {msg.sender === "user" && (
                    <FaUserCircle className="text-blue-500 text-2xl mt-auto" />
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 self-start">
                  <FaRobot className="text-indigo-600 text-xl" />
                  <div className="bg-white border border-gray-200 px-4 py-2 rounded-2xl text-gray-700 shadow flex gap-2 items-center">
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-300"></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />

              {/* Scroll-to-bottom button */}
              {messages.length > 0 && !autoScroll && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="sticky bottom-2 self-end bg-indigo-500 text-white p-3 rounded-full shadow-lg hover:bg-indigo-600 transition"
                  title="Scroll to latest message"
                >
                  <FaArrowDown />
                </motion.button>
              )}
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-gray-200">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm shadow-sm"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  onKeyDown={onKeyDown}
                />
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={sendMessage}
                  className="bg-gradient-to-br from-blue-500 via-indigo-500 to-gray-400 text-white px-4 py-2 rounded-xl shadow-lg hover:from-blue-600 hover:to-indigo-700 transition disabled:opacity-50 flex items-center gap-2"
                  disabled={isTyping || !input.trim()}
                >
                  <FaPaperPlane size={16} className="animate-pulse" />
                  Send
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
