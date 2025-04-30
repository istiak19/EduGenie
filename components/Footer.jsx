"use client";

import Image from "next/image";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white text-black pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Logo & Tagline */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/Edugine-logo.png"
                alt="EduGenie Logo"
                width={40}
                height={40}
              />
              <h2 className="text-3xl font-bold text-black">EduGenie</h2>
            </div>
            <p className="mt-3 text-gray-600 text-sm leading-relaxed">
              Empowering learners through AI-powered personalized education.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-yellow-500 transition-colors">Home</a>
              </li>
              <li>
                <a href="/courses" className="hover:text-yellow-500 transition-colors">Courses</a>
              </li>
              <li>
                <a href="/blogs" className="hover:text-yellow-500 transition-colors">Blog</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-yellow-500 transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-yellow-500 transition-colors">FAQs</a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-500 transition-colors">Support</a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-500 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-500 transition-colors">Terms of Service</a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex items-center gap-4 mt-2 flex-wrap">
              <a href="#" className="text-xl hover:text-yellow-500 transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="text-xl hover:text-yellow-500 transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="text-xl hover:text-yellow-500 transition-colors">
                <FaLinkedinIn />
              </a>
              <a href="#" className="text-xl hover:text-yellow-500 transition-colors">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="mt-10 border-t border-gray-300 pt-6 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} <span className="font-semibold text-black">EduGenie</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
}