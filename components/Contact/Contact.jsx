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
    <div className="max-w-3xl mx-auto my-10">
      {/* ------------- */}
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg">
        <h2 className="text-xl md:text-5xl font-semibold text-center my-6">
          Contact Us
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xl font-medium mb-1">First Name</label>
            <Input
              type="text"
              placeholder="First Name"
              className="w-full text-xl border-2"
              name="firstName"
              required
            />
          </div>
          <div>
            <label className="block text-xl font-medium mb-1">Last Name</label>
            <Input
              type="text"
              placeholder="Last Name"
              className="w-full text-xl border-2"
              name="lastName"
              required
            />
          </div>
          <div>
            <label className="block text-xl font-medium mb-1">Email</label>
            <Input
              type="email"
              placeholder="Email"
              className="w-full text-xl border-2"
              name="email"
              required
            />
          </div>
          <div>
            <label className="block text-xl font-medium mb-1">Phone</label>
            <Input
              type="tel"
              placeholder="Phone"
              className="w-full text-xl border-2"
              name="tel"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xl font-medium mb-1">Message</label>
            <Textarea
              placeholder="Message"
              className="w-full h-32 text-xl border-2"
              name="message"
              required
            />
          </div>
          <div className="md:col-span-2 text-center">
            <Button type="submit" className="w-full md:w-auto text-xl">
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
