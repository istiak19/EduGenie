"use client";

import { motion } from "framer-motion";
import { Menu, X, Bell } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./ui/mode-toggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => setIsClient(true), []);

  const staticMenuItems = ["Home", "Courses", "Blog", "Contact"];
  const menuItems =
    status === "authenticated"
      ? [...staticMenuItems.slice(0, 2), "Dashboard", ...staticMenuItems.slice(2)]
      : staticMenuItems;

  const getRoute = (item) => {
    switch (item) {
      case "Home": return "/";
      case "Courses": return "/courses";
      case "Dashboard": return session?.user?.role === "educator" ? "/dashboard/educatorHome" : "/dashboard/studentHome";
      case "Blog": return "/blogs";
      case "Contact": return "/contact";
      default: return "/";
    }
  };

  const handleSignOut = () => {
    signOut();
    setIsOpen(false);
  };

  if (!isClient) return null;

  return (
    <nav className="sticky top-0 w-full bg-white dark:bg-gray-900 shadow-md z-50 transition-all">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <motion.div initial={{ rotate: 0 }} whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
            <Image src="/Edugine-logo.png" alt="EduGenie Logo" width={40} height={40} />
          </motion.div>
          <span className="text-2xl font-bold text-teal-600 dark:text-white">EduGenie</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              href={getRoute(item)}
              className="text-gray-700 dark:text-gray-300 hover:text-teal-600 transition-colors font-medium"
            >
              {item}
            </Link>
          ))}

          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 rounded-md border dark:bg-gray-800 dark:border-gray-700 dark:text-white text-sm focus:outline-teal-500"
          />

          <button className="text-gray-600 dark:text-gray-300 hover:text-teal-500 transition">
            <Bell size={20} />
          </button>

          <ModeToggle />

          {status === "authenticated" ? (
            <div className="flex items-center gap-3">
              {/* Profile */}
              <div className="relative group">
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name ?? "User"}
                    width={40}
                    height={40}
                    className="rounded-full border border-teal-500 cursor-pointer shadow-sm transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center rounded-full border border-teal-500 bg-gray-100 text-teal-700 font-semibold transition-transform duration-300 group-hover:scale-110">
                    {session?.user?.name?.[0]?.toUpperCase() ?? ""}
                  </div>
                )}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {session?.user?.name ?? "User"}
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <motion.button onClick={() => setIsOpen(!isOpen)} className="md:hidden" whileTap={{ scale: 0.9 }}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white dark:bg-gray-800 px-6 py-5 space-y-4 rounded-b-lg shadow-lg"
        >
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              href={getRoute(item)}
              onClick={() => setIsOpen(false)}
              className="block text-gray-800 dark:text-gray-300 hover:text-teal-600 font-medium transition"
            >
              {item}
            </Link>
          ))}

          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 rounded-md border dark:bg-gray-800 dark:border-gray-700 dark:text-white text-sm focus:outline-teal-500"
          />

          {status === "authenticated" ? (
            <div className="flex items-center gap-3 pt-2">
              <div className="relative group">
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name ?? "User"}
                    width={40}
                    height={40}
                    className="rounded-full border border-teal-500 cursor-pointer shadow-sm transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center rounded-full border border-teal-500 bg-gray-100 text-teal-700 font-semibold transition-transform duration-300 group-hover:scale-110">
                    {session?.user?.name?.[0]?.toUpperCase() ?? ""}
                  </div>
                )}
              </div>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="block text-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
            >
              Login
            </Link>
          )}
        </motion.div>
      )}
    </nav>
  );
};