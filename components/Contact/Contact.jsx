'use client';

import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log("Form Data:", data);
  };

  return (
    <div className="max-w-3xl mx-auto my-28 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-teal-600 mb-8">
          Contact Us
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-lg font-medium mb-2">First Name</label>
            <Input
              type="text"
              name="firstName"
              placeholder="Your first name"
              required
              className="text-lg border-gray-300"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-lg font-medium mb-2">Last Name</label>
            <Input
              type="text"
              name="lastName"
              placeholder="Your last name"
              required
              className="text-lg border-gray-300"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-lg font-medium mb-2">Email</label>
            <Input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              className="text-lg border-gray-300"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-lg font-medium mb-2">Phone</label>
            <Input
              type="tel"
              name="tel"
              placeholder="+8801XXXXXXXXX"
              required
              className="text-lg border-gray-300"
            />
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <label className="block text-lg font-medium mb-2">Message</label>
            <Textarea
              name="message"
              placeholder="Type your message here..."
              required
              className="text-lg border-gray-300 h-32"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 text-center">
            <Button type="submit" className="bg-teal-500 hover:bg-teal-700 w-full">
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;