"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: 'Hi! How can I help you today?', fromBot: true }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const playSound = () => {
    const audio = new Audio('/message-sound.mp3');
    audio.play();
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { text: input, fromBot: false };
    setMessages((prev) => [...prev, userMessage]);
    playSound();

    setInput('');
    setIsTyping(true);

    const botResponse = getBotResponse(input);
    setTimeout(() => {
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
      playSound();
    }, 1000);
  };

  const getBotResponse = (input) => {
    const lower = input.toLowerCase();
    if (lower.includes('course')) {
      return { text: 'Looking for courses? Check out our Web Development or Data Science tracks!', fromBot: true };
    }
    if (lower.includes('faq')) {
      return { text: 'Visit our FAQ section for more information.', fromBot: true };
    }
    if (lower.includes('support')) {
      return { text: 'How can I assist you? 1. Technical Support 2. Account Help 3. General Inquiry', fromBot: true };
    }
    if (lower.includes('technical support')) {
      return { text: 'Describe your technical issue and I’ll assist you.', fromBot: true };
    }
    if (lower.includes('account help')) {
      return { text: 'For account issues like password reset, follow the instructions in the Help section.', fromBot: true };
    }
    return { text: 'I’m not sure about that. Let me know if I can help with anything else!', fromBot: true };
  };

  const quickReplies = ['Courses', 'FAQ', 'Support'];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`bg-white shadow-2xl rounded-3xl w-80 p-5 transition-all duration-300 ${isOpen ? '' : 'hidden'} flex flex-col`}
      >
        <div className="mb-4 h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-teal-300 scrollbar-track-gray-100 pr-2">
          {messages.map((msg, index) => (
            <div key={index} className={`my-2 flex ${msg.fromBot ? 'justify-start' : 'justify-end'}`}>
              {msg.fromBot && <div className="mr-2 text-lg">🤖</div>}
              <div
                className={`p-3 rounded-2xl text-sm ${msg.fromBot ? 'bg-blue-100 text-blue-900' : 'bg-green-200 text-green-900'} max-w-[75%]`}
              >
                {msg.text.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
              {!msg.fromBot && <div className="ml-2 text-lg">🧑</div>}
            </div>
          ))}
          {isTyping && <div className="text-gray-500 text-sm">🤖 Typing...</div>}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex items-center gap-2 mt-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm"
          />
          <button
            onClick={handleSend}
            className="bg-teal-400 hover:bg-teal-500 p-3 rounded-full text-white text-sm flex items-center justify-center transition"
          >
            ➤
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              onClick={() => setInput(reply)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs transition"
            >
              {reply}
            </button>
          ))}
        </div>
      </motion.div>

      <button
        onClick={toggleChat}
        className="fixed bottom-6 cursor-pointer right-6 bg-teal-500 hover:bg-teal-600 p-4 rounded-full text-white text-xl shadow-lg transition"
      >
        {isOpen ? '✖' : '💬'}
      </button>
    </div>
  );
};

export default Chatbot;