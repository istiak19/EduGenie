"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaUser, FaBookOpen, FaBlogger, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const EducatorHome = () => {
    const { data: session } = useSession();

    const [users, setUsers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [contact, setContact] = useState([]);
    const [blog, setBlog] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch("/api/user");
            const data = await res.json();
            setUsers(data);
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            const res = await fetch("/api/course");
            const data = await res.json();
            setCourses(data);
        };
        fetchCourses();
    }, []);

    useEffect(() => {
        const fetchBlog = async () => {
            const res = await fetch("/api/blogs");
            const data = await res.json();
            setBlog(data);
        };
        fetchBlog();
    }, []);

    useEffect(() => {
        const fetchContact = async () => {
            const res = await fetch("/api/contact");
            const data = await res.json();
            setContact(data);
        };
        fetchContact();
    }, []);

    const singleUser = users.find((user) => user?.email === session?.user?.email);

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-20">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-lg p-6 md:p-10 border border-teal-300"
            >
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
                    Welcome to your dashboard, {singleUser?.name?.split(" ")[0]}!
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Users */}
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-blue-100 border-l-4 border-blue-500 p-6 rounded-lg shadow hover:shadow-md transition"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 font-medium">Total Users</p>
                                <p className="text-3xl font-bold text-blue-700">{users.length}</p>
                            </div>
                            <FaUser className="text-4xl text-blue-500" />
                        </div>
                    </motion.div>

                    {/* Courses */}
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.7 }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-green-100 border-l-4 border-green-500 p-6 rounded-lg shadow hover:shadow-md transition"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 font-medium">Total Courses</p>
                                <p className="text-3xl font-bold text-green-700">{courses.length}</p>
                            </div>
                            <FaBookOpen className="text-4xl text-green-500" />
                        </div>
                    </motion.div>

                    {/* Blogs */}
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.8 }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-yellow-100 border-l-4 border-yellow-500 p-6 rounded-lg shadow hover:shadow-md transition"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 font-medium">Total Blogs</p>
                                <p className="text-3xl font-bold text-yellow-700">{blog.length}</p>
                            </div>
                            <FaBlogger className="text-4xl text-yellow-500" />
                        </div>
                    </motion.div>

                    {/* Messages */}
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.9 }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-red-100 border-l-4 border-red-500 p-6 rounded-lg shadow hover:shadow-md transition"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 font-medium">Messages</p>
                                <p className="text-3xl font-bold text-red-700">{contact.length}</p>
                            </div>
                            <FaEnvelope className="text-4xl text-red-500" />
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default EducatorHome;