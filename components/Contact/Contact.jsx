'use client';
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
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
    <div className="max-w-6xl mx-auto my-28 px-4">
      <ToastContainer />
      <div className="bg-white p-6 md:p-10 rounded-lg shadow-md">
        {/* Page Title */}
        <h2 className="text-3xl md:text-5xl font-bold text-center text-emerald-500 mb-12">
          Contact Us
        </h2>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Address Section */}
          <div className="md:w-1/2 space-y-4 text-gray-700">
            <h3 className="text-2xl font-semibold text-emerald-600 mb-4">Our Office</h3>
            <p><strong>Address:</strong> 1234 Emerald Street, Green City, EG 56789</p>
            <p><strong>Email:</strong> contact@example.com</p>
            <p><strong>Phone:</strong> +880 1234 567 890</p>
            <p><strong>Opening Hours:</strong></p>
            <ul className="ml-5 list-disc">
              <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
              <li>Saturday: 10:00 AM - 2:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
            <p>
              <strong>Google Map:</strong>{" "}
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 underline"
              >
                View Location
              </a>
            </p>
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block w-px bg-gray-300 mx-2"></div>

          {/* Contact Form Section */}
          <div className="md:w-1/2 space-y-4">
            <h3 className="text-2xl font-semibold text-emerald-600 mb-4">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-lg font-medium mb-2 text-gray-800">First Name</label>
                <Input
                  type="text"
                  name="firstName"
                  placeholder="Your first name"
                  required
                  className="text-lg border-gray-300 focus:ring-emerald-500"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-lg font-medium mb-2 text-gray-800">Last Name</label>
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Your last name"
                  required
                  className="text-lg border-gray-300 focus:ring-emerald-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-lg font-medium mb-2 text-gray-800">Email</label>
                <Input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  className="text-lg border-gray-300 focus:ring-emerald-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-lg font-medium mb-2 text-gray-800">Phone</label>
                <Input
                  type="tel"
                  name="tel"
                  placeholder="+8801XXXXXXXXX"
                  required
                  className="text-lg border-gray-300 focus:ring-emerald-500"
                />
              </div>

              {/* Message */}
              <div className="md:col-span-2">
                <label className="block text-lg font-medium mb-2 text-gray-800">Message</label>
                <Textarea
                  name="message"
                  placeholder="Type your message here..."
                  required
                  className="text-lg border-gray-300 focus:ring-emerald-500 h-32"
                />
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2 text-center">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-emerald-500 hover:bg-emerald-700 text-white w-full"
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
