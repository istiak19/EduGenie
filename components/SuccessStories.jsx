"use client";

import { motion } from "framer-motion";

export default function SuccessStories() {
  const stats = [
    { label: "100K+", text: "Students Empowered" },
    { label: "98%", text: "Satisfaction Rate" },
    { label: "50+", text: "Expert-Led Courses" },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sophia Patel",
      text: "EduGenie transformed my learning experience! I landed my first tech job after completing AI-powered courses.",
      image: "https://my.clevelandclinic.org/-/scassets/images/org/patient-experience/patient-stories/724-new-endoscopy-procedure-simplifies-testing-for-chronic-condition/new-endoscopy-procedure-simplifies-testing-1.jpg?mw=430&hash=6E0EB93BD41E0AA3595929E89D21B7C09E960D43",
    },
    {
      id: 2,
      name: "Mark Robinson",
      text: "The interactive courses and personalized AI recommendations helped me upskill faster than ever.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNsxeqTj16QraEJsrpxM8om5YUn83B2JxOqA&s",
    },
    
  ];

  return (
    <section className="bg-gray-300 py-16 px-6 text-center">
      {/* Section Header */}
      <motion.h2
        className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Real Stories. Real Impact.
      </motion.h2>
      <p className="text-md sm:text-lg text-gray-600 mb-10 px-4">
        See how EduGenie is transforming lives with AI-powered learning.
      </p>

      {/* Statistics */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-12">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-md p-6 rounded-lg w-40 sm:w-48"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-600">{stat.label}</h3>
            <p className="text-gray-600">{stat.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Success Stories */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            className="p-6 bg-white shadow-lg rounded-lg flex flex-col sm:flex-row items-center gap-4"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="text-center sm:text-left">
              <p className="text-gray-700">"{testimonial.text}"</p>
              <h4 className="font-semibold mt-2 text-blue-600">{testimonial.name}</h4>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Chat Preview */}
      <div className="mt-16 px-4">
        <motion.div
          className="max-w-md mx-auto bg-white shadow-lg p-6 rounded-lg relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Meet Your AI Assistant</h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Ask anything about your learning journey!
          </p>
          
          {/* Chat Bubble */}
          <motion.div
            className="bg-yellow-400 text-gray-900 p-3 rounded-lg mt-4 inline-block text-left text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
          >
            <p>📢 "How can I help you learn today?"</p>
          </motion.div>

          {/* Chat Input Preview */}
          <div className="mt-4 flex border rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Ask something..."
              className="w-full p-2 text-sm sm:text-base outline-none"
            />
            <button className="bg-yellow-400 text-gray-900 px-4 text-sm sm:text-base">➤</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
