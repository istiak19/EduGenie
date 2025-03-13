"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: 'Hi! How can I help you today?', fromBot: true }]);
  const [input, setInput] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { text: input, fromBot: false };
    setMessages([...messages, userMessage]);

    const botResponse = getBotResponse(input);
    setTimeout(() => setMessages([...messages, userMessage, botResponse]), 1000);
    setInput('');
  };

  const getBotResponse = (input) => {
    if (input.toLowerCase().includes('course')) {
      return { text: 'Looking for courses? I’d recommend checking out our Web Development or Data Science tracks!', fromBot: true };
    }
    if (input.toLowerCase().includes('faq')) {
      return { text: 'You can find our FAQ here: [link]', fromBot: true };
    }
    return { text: 'I’m not sure, but I can help you find the right info!', fromBot: true };
  };

  return (
    <div className="right-4 bottom-4 z-50 fixed">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`bg-white shadow-lg rounded-2xl w-64 p-4 transition-all duration-300 ${isOpen ? '' : 'hidden'}`}
      >
        <div className="mb-4 h-48 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`my-2 ${msg.fromBot ? 'text-left' : 'text-right'}`}>
              <div
                className={`inline-block p-3 rounded-xl ${msg.fromBot ? 'bg-blue-100' : 'bg-green-100'} text-gray-800`}
                style={{ maxWidth: '80%' }}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="flex mt-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-gray-800"
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 hover:bg-blue-600 ml-2 p-3 rounded-xl text-white transition-colors duration-200"
          >
            Send
          </button>
        </div>
      </motion.div>
      <button
        onClick={toggleChat}
        className="right-4 bottom-4 fixed bg-blue-500 hover:bg-blue-600 p-4 rounded-full text-white transition-colors duration-200"
      >
        💬
      </button>
    </div>
  );
};

export default Chatbot;
