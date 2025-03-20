"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: 'Hi! How can I help you today?', fromBot: true }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const playSound = () => {
    const audio = new Audio('/message-sound.mp3');
    audio.play();
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { text: input, fromBot: false };
    setMessages([...messages, userMessage]);
    playSound();

    setInput('');
    setIsTyping(true);

    const botResponse = getBotResponse(input);
    setTimeout(() => {
      setMessages([...messages, userMessage, botResponse]);
      setIsTyping(false);
      playSound();
    }, 1000);
  };

  const getBotResponse = (input) => {
    if (input.toLowerCase().includes('course')) {
      return { text: 'Looking for courses? I’d recommend checking out our Web Development or Data Science tracks!', fromBot: true };
    }
    if (input.toLowerCase().includes('faq')) {
      return { text: 'You can check out our Frequently Asked Questions in the Help section of our website for more details.', fromBot: true };
    }
    if (input.toLowerCase().includes('support')) {
      return {
        text: 'How can I assist you with support? You can choose:\n1. Technical Support\n2. Account Help\n3. General Inquiry',
        fromBot: true
      };
    }
    if (input.toLowerCase().includes('technical support')) {
      return { text: 'Having technical issues? Please describe the issue, and I’ll help you resolve it as soon as possible.', fromBot: true };
    }
    if (input.toLowerCase().includes('account help')) {
      return { text: 'For account-related issues like login problems, password reset, or account recovery, please follow these steps...', fromBot: true };
    }
    return { text: 'That’s a bit beyond my reach, but I’d love to help with something else! What can I assist you with?', fromBot: true };

  };

  const quickReplies = ['Courses', 'FAQ', 'Support'];

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
            <div key={index} className={`my-2 flex ${msg.fromBot ? 'justify-start' : 'justify-end'}`}> 
              {msg.fromBot && <div className="mr-2">🤖</div>}
              <div
                className={`inline-block p-3 rounded-xl ${msg.fromBot ? 'bg-teal-100' : 'bg-green-100'} text-gray-800`}
                style={{ maxWidth: '80%' }}
              >
                {msg.text}
              </div>
              {!msg.fromBot && <div className="ml-2">🧑</div>}
            </div>
          ))}
          {isTyping && <div className="text-gray-500 text-sm">🤖 is typing...</div>}
        </div>
        <div className="flex mt-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 w-full text-gray-800"
          />
          <button
            onClick={handleSend}
            className="bg-teal-400 hover:bg-teal-500 ml-2 p-3 rounded-xl text-white transition-colors duration-200"
          >
            Send
          </button>
        </div>
        <div className="flex gap-2 mt-2">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              onClick={() => setInput(reply)}
              className="bg-gray-200 p-2 rounded-xl text-gray-800 text-sm"
            >
              {reply}
            </button>
          ))}
        </div>
      </motion.div>
      <button
        onClick={toggleChat}
        className="right-4 bottom-4 fixed bg-teal-400 hover:bg-teal-500 p-4 rounded-full text-white transition-colors duration-200"
      >
        {isOpen ? '❌' : '💬'}
      </button>
    </div>
  );
};

export default Chatbot;
