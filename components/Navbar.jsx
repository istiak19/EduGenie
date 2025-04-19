"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { usePathname } from "next/navigation"; // Import usePathname for active route detection

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname(); // Get the current route

  const menuItems = ["Home", "Courses", "Generator", "Dashboard", "Contact", "Blogs"];

  const getRoute = (item) => (item === "Home" ? "/" : `/${item.toLowerCase()}`);

  const handleSignOut = () => {
    signOut();
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 left-0 w-full bg-gray-900 shadow-md z-50 transition-all">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/Edugine-logo.png"
              alt="EduGenie Logo"
              width={40}
              height={40}
            />
          </motion.div>
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
            EduGenie
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {menuItems.map((item, index) => {
            const isActive = pathname === getRoute(item); // Check if the current route matches the menu item
            return (
              <motion.li
                key={index}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={getRoute(item)}
                  className={`relative text-gray-400 hover:text-purple-400 transition-colors ${
                    isActive ? "text-purple-400" : ""
                  }`}
                >
                  {item}
                  {/* Underline for active item */}
                  {isActive && (
                    <motion.span
                      layoutId="underline" // Unique ID for smooth transitions
                      className="absolute left-0 right-0 top-5 h-[2px] bg-purple-400 rounded-full"
                    />
                  )}
                </Link>
              </motion.li>
            );
          })}
        </ul>

        {/* Authentication (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          {status === "authenticated" ? (
            <>
              <span className="text-sm text-gray-400">
                Welcome, {session?.user?.name?.split(" ")[0]}
              </span>
              <button
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-md px-4 py-2 hover:opacity-90 transition"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-md hover:opacity-90 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-gray-800 px-6 py-4 space-y-4 shadow-lg"
        >
          {menuItems.map((item, index) => {
            const isActive = pathname === getRoute(item); // Check if the current route matches the menu item
            return (
              <Link
                key={index}
                href={getRoute(item)}
                onClick={() => setIsOpen(false)}
                className={`block relative text-gray-400 hover:text-purple-400 transition ${
                  isActive ? "text-purple-400" : ""
                }`}
              >
                {item}
                {/* Underline for active item */}
                {isActive && (
                  <motion.span
                    layoutId="underline" // Unique ID for smooth transitions
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-purple-400 rounded-full"
                  />
                )}
              </Link>
            );
          })}
          <div className="flex flex-col space-y-2 pt-2">
            {status === "authenticated" ? (
              <>
                <span className="text-sm text-gray-400">
                  Welcome, {session?.user?.name?.split(" ")[0]}
                </span>
                <button
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-md px-4 py-2 hover:opacity-90 transition"
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
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-md hover:opacity-90 transition text-center"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border border-purple-500 text-purple-500 rounded-md text-center hover:bg-purple-500 hover:text-white transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}