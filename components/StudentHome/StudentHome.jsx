"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBookOpen, FaBlogger, FaClipboardList } from "react-icons/fa";

const StudentHome = () => {
    const { data: session } = useSession();

    const [courses, setCourses] = useState([]);
    const [result, setResult] = useState([]);
    const [users, setUsers] = useState([]);

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
        const fetchResult = async () => {
            const res = await fetch("/api/quiz/submit");
            const data = await res.json();
            setResult(data);
        };
        fetchResult();
    }, []);

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
    };

    const singleUser = users.find(user => user?.email === session?.user?.email);
    const myResults = result.filter(res => res?.email === session?.user?.email);
    const ownCourse = courses.filter(res => res?.email === session?.user?.email);

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-md md:shadow-lg p-6 md:p-10 border border-blue-300"
            >
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
                    Welcome back, {singleUser?.name?.split(" ")[0]}!
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Total Courses */}
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-green-100 border-l-4 border-green-500 p-5 md:p-6 rounded-lg shadow hover:shadow-md transition duration-300"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs md:text-sm text-gray-600 font-medium">Total Courses</p>
                                <p className="text-2xl md:text-3xl font-bold text-green-700">{ownCourse.length}</p>
                            </div>
                            <FaBookOpen className="text-3xl md:text-4xl text-green-500" />
                        </div>
                    </motion.div>

                    {/* My Quiz Results */}
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-purple-100 border-l-4 border-purple-500 p-5 md:p-6 rounded-lg shadow hover:shadow-md transition duration-300"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs md:text-sm text-gray-600 font-medium">My Quiz Results</p>
                                <p className="text-2xl md:text-3xl font-bold text-purple-700">{myResults.length}</p>
                            </div>
                            <FaBlogger className="text-3xl md:text-4xl text-purple-500" />
                        </div>
                    </motion.div>

                    {/* My Tasks */}
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.7 }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-indigo-100 border-l-4 border-indigo-500 p-5 md:p-6 rounded-lg shadow hover:shadow-md transition duration-300"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs md:text-sm text-gray-600 font-medium">My Tasks</p>
                                <p className="text-2xl md:text-3xl font-bold text-indigo-700">{myResults.length}</p>
                            </div>
                            <FaClipboardList className="text-3xl md:text-4xl text-indigo-500" />
                        </div>
                    </motion.div>

                    {/* Feedbacks / Messages */}
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.8 }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-blue-100 border-l-4 border-blue-500 p-5 md:p-6 rounded-lg shadow hover:shadow-md transition duration-300"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs md:text-sm text-gray-600 font-medium">Feedbacks / Messages</p>
                                <p className="text-2xl md:text-3xl font-bold text-blue-700">—</p>
                            </div>
                            <FaBlogger className="text-3xl md:text-4xl text-blue-500" />
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default StudentHome;