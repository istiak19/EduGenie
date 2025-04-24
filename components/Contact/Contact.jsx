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
        headers: { "Content-Type": "application/json" },
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
    <div className="max-w-6xl mx-auto my-10 px-4">
      <ToastContainer />
      <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 md:p-12">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-emerald-600 mb-12">
          Get In Touch With Us
        </h2>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Address Section */}
          <div className="md:w-1/2 space-y-6 text-gray-700">
            <h3 className="text-2xl font-semibold text-emerald-600">Our Office</h3>
            <p><strong>📍 Address:</strong> 1234 Emerald Street, Green City, EG 56789</p>
            <p><strong>📧 Email:</strong> edugenie@example.com</p>
            <p><strong>📞 Phone:</strong> +880 1234 567 890</p>
            <div>
              <strong>🕒 Opening Hours:</strong>
              <div className="ml-5 mt-2 space-y-1">
                <p>Sun - Thu: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 2:00 PM</p>
                <p>Friday: Closed</p>
              </div>
            </div>
            <p>
              <strong>🌍 Location:</strong>{" "}
              <a
                href="https://maps.app.goo.gl/mUnCPz9LAKjbZAF57"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 underline hover:text-emerald-800 transition"
              >
                View on Google Maps
              </a>
            </p>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px bg-gray-300"></div>

          {/* Contact Form Section */}
          <div className="md:w-1/2 space-y-6">
            <h3 className="text-2xl font-semibold text-emerald-600">Send a Message</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-base font-medium mb-2">First Name</label>
                <Input
                  type="text"
                  name="firstName"
                  placeholder="Your first name"
                  required
                  className="text-base"
                />
              </div>
              <div>
                <label className="block text-base font-medium mb-2">Last Name</label>
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Your last name"
                  required
                  className="text-base"
                />
              </div>
              <div>
                <label className="block text-base font-medium mb-2">Email</label>
                <Input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  className="text-base"
                />
              </div>
              <div>
                <label className="block text-base font-medium mb-2">Phone</label>
                <Input
                  type="tel"
                  name="tel"
                  placeholder="+8801XXXXXXXXX"
                  required
                  className="text-base"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-base font-medium mb-2">Message</label>
                <Textarea
                  name="message"
                  placeholder="Type your message here..."
                  required
                  className="h-36 text-base"
                />
              </div>
              <div className="md:col-span-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-500 hover:bg-emerald-700 text-white text-lg"
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