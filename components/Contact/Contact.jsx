"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Message sent successfully!");
        e.target.reset();
      } else {
        const errData = await res.json();
        toast.error(errData?.error || "Something went wrong!");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Server error! Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-28 px-4">
      <ToastContainer />
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-purple-500">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600 mb-8">
          Contact Us
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-lg font-medium mb-2 text-gray-400">First Name</label>
            <Input
              type="text"
              name="firstName"
              placeholder="Your first name"
              required
              className="text-lg border-gray-700 focus:border-purple-500 focus:ring-purple-500 bg-gray-900 text-white placeholder-gray-500"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-lg font-medium mb-2 text-gray-400">Last Name</label>
            <Input
              type="text"
              name="lastName"
              placeholder="Your last name"
              required
              className="text-lg border-gray-700 focus:border-purple-500 focus:ring-purple-500 bg-gray-900 text-white placeholder-gray-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-lg font-medium mb-2 text-gray-400">Email</label>
            <Input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              className="text-lg border-gray-700 focus:border-purple-500 focus:ring-purple-500 bg-gray-900 text-white placeholder-gray-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-lg font-medium mb-2 text-gray-400">Phone</label>
            <Input
              type="tel"
              name="tel"
              placeholder="+8801XXXXXXXXX"
              required
              className="text-lg border-gray-700 focus:border-purple-500 focus:ring-purple-500 bg-gray-900 text-white placeholder-gray-500"
            />
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <label className="block text-lg font-medium mb-2 text-gray-400">Message</label>
            <Textarea
              name="message"
              placeholder="Type your message here..."
              required
              className="text-lg border-gray-700 focus:border-purple-500 focus:ring-purple-500 bg-gray-900 text-white placeholder-gray-500 h-32"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 text-center">
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:opacity-90 text-white w-full py-3 rounded-md transition-all duration-300"
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;