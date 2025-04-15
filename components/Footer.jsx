"use client";

import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-indigo-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo & Tagline */}
        <div>
          <h2 className="text-3xl font-bold text-orange-300">EduGenie</h2>
          <p className="mt-3 text-indigo-200 text-sm leading-relaxed">
            Empowering learners through AI-powered personalized education.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-orange-400 transition-colors">Home</a>
            </li>
            <li>
              <a href="/courses" className="hover:text-orange-400 transition-colors">Courses</a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-400 transition-colors">Blog</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-orange-400 transition-colors">Contact</a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-orange-400 transition-colors">FAQs</a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-400 transition-colors">Support</a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="text-xl hover:text-orange-400 transition-colors">
              <FaFacebookF />
            </a>
            <a href="#" className="text-xl hover:text-orange-400 transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="text-xl hover:text-orange-400 transition-colors">
              <FaLinkedinIn />
            </a>
            <a href="#" className="text-xl hover:text-orange-400 transition-colors">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-indigo-700 pt-6 text-center text-sm text-indigo-200">
        © {new Date().getFullYear()} <span className="font-semibold text-orange-300">EduGenie</span>. All rights reserved.
      </div>
    </footer>
  );
}
