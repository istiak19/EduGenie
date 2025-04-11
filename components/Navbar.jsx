"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  const menuItems = ["Home", "Courses", "Generator", "About", "Contact"];

  const getRoute = (item) =>
    item === "Home" ? "/" : `/${item.toLowerCase()}`;

  const handleSignOut = () => {
    signOut();
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md dark:bg-gray-900 z-50 transition-all">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Image src="/Edugine-logo.png" alt="EduGenie Logo" width={40} height={40} />
          </motion.div>
          <span className="text-2xl font-bold text-emerald-500 dark:text-white">EduGenie</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {
            menuItems.map((item, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={getRoute(item)}
                  className="text-gray-800 dark:text-gray-300 hover:text-indigo-500 transition-colors"
                >
                  {item}
                </Link>
              </motion.li>
            ))
          }
        </ul>

        {/* Authentication (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          {
            status === 'authenticated' ? (
              <>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Welcome, {session?.user?.name?.split(" ")[0]}
                </span>
                <button
                  className="bg-emerald-500 text-white rounded-md px-4 py-2 hover:bg-emerald-600 transition"
                  onClick={handleSignOut}
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition"
              >
                Login
              </Link>
            )
          }
        </div>

        {/* Mobile Menu Toggle */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {
        isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-800 px-6 py-4 space-y-4 shadow-lg"
          >
            {
              menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={getRoute(item)}
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-800 dark:text-gray-300 hover:text-indigo-500 transition"
                >
                  {item}
                </Link>
              ))
            }
            <div className="flex flex-col space-y-2 pt-2">
              {
                status === 'authenticated' ? (
                  <>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Welcome, {session?.user?.name?.split(" ")[0]}
                    </span>
                    <button
                      className="bg-emerald-500 text-white rounded-md px-4 py-2 hover:bg-emerald-600 transition"
                      onClick={handleSignOut}
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition text-center"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 border border-emerald-600 text-emerald-600 rounded-md text-center hover:bg-emerald-600 hover:text-white transition"
                    >
                      Sign Up
                    </Link>
                  </>
                )
              }
            </div>
          </motion.div>
        )
      }
    </nav>
  );
}
