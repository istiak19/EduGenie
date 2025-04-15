"use client";

import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRegCalendarAlt, FaCopy, FaFacebookF, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const EidGreeting = () => {
    const greetings = [
        "Eid Mubarak! May this Eid bring joy and peace to your life.",
        "Wishing you a blessed Eid filled with happiness and prosperity.",
        "Eid Mubarak to you and your family! May your days be full of love and joy.",
        "Sending you heartfelt wishes on this blessed Eid. Eid Mubarak!",
        "May Allah bless you with peace, happiness, and endless blessings. Eid Mubarak!"
    ];

    const giftSuggestions = [
        "A beautiful prayer mat.",
        "A set of Eid-themed candles.",
        "Personalized Eid greeting cards.",
        "A gift box with sweet treats.",
        "A stylish watch for a perfect Eid look."
    ];

    const [greeting, setGreeting] = useState("");
    const [gift, setGift] = useState("");
    const [showConfetti, setShowConfetti] = useState(false);
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const getNextEidDate = () => new Date("2025-04-10");

    useEffect(() => {
        const interval = setInterval(() => {
            const eidDate = getNextEidDate();
            const timeLeft = eidDate - new Date();

            if (timeLeft <= 0) {
                clearInterval(interval);
                return;
            }

            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            setCountdown({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const generateGreeting = () => {
        const newGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        const newGift = giftSuggestions[Math.floor(Math.random() * giftSuggestions.length)];
        setGreeting(newGreeting);
        setGift(newGift);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
    };

    const copyGreetingToClipboard = () => {
        navigator.clipboard.writeText(greeting)
            .then(() => alert("Greeting copied to clipboard!"))
            .catch(err => console.error("Failed to copy text: ", err));
    };

    const encodedGreeting = encodeURIComponent(greeting);

    const countdownVariants = {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 10 }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 70, damping: 12 }}
            className="bg-teal-100 shadow-2xl mx-auto my-10 p-8 rounded-xl max-w-lg text-center"
        >
            <h2 className="mb-6 font-bold text-teal-600 text-3xl">Eid Greeting Generator</h2>

            {showConfetti && <Confetti />}

            <div className="mb-6">
                <div className="text-xl font-semibold text-teal-700 flex items-center justify-center mb-4">
                    <FaRegCalendarAlt className="mr-2" />
                    Countdown to Eid
                </div>
                <div className="flex justify-center gap-4 mb-4">
                    {["days", "hours", "minutes", "seconds"].map((unit, index) => (
                        <motion.div
                            key={index}
                            className="bg-white shadow-md rounded-lg p-6 w-24 text-center"
                        >
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={countdown[unit]}
                                    variants={countdownVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={{ duration: 0.3 }}
                                    className="text-2xl font-bold text-teal-700"
                                >
                                    {countdown[unit]}
                                </motion.p>
                            </AnimatePresence>
                            <span className="text-sm text-gray-600 capitalize">{unit}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {greeting && (
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6 text-gray-800 text-xl italic"
                >
                    {greeting}
                </motion.p>
            )}

            {gift && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 120, damping: 8 }}
                    className="bg-teal-50 shadow-lg hover:shadow-2xl mt-6 p-6 rounded-lg"
                >
                    <p className="mb-2 font-semibold text-teal-600 text-xl">How about this gift idea?</p>
                    <p className="font-medium text-gray-800 text-lg">
                        <span className="font-bold text-teal-700">{gift}</span>
                    </p>
                </motion.div>
            )}

            <div className="mt-8 flex flex-col gap-6 items-center">
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={generateGreeting}
                    className="bg-teal-600 hover:bg-teal-700 px-6 py-3 rounded-md font-semibold text-white transition duration-300"
                >
                    Get an Eid Greeting
                </motion.button>

                {greeting && (
                    <>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ scale: 1.05 }}
                            onClick={copyGreetingToClipboard}
                            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-md font-semibold text-white transition duration-300 flex items-center"
                        >
                            <FaCopy className="mr-2" />
                            Copy Greeting
                        </motion.button>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex gap-6 mt-2"
                        >
                            {[ 
                                { href: `https://www.facebook.com/sharer/sharer.php?u=https://your-app-url.com&quote=${encodedGreeting}`, icon: <FaFacebookF />, bg: "bg-blue-600", hover: "hover:bg-blue-700" },
                                { href: `https://twitter.com/intent/tweet?text=${encodedGreeting}`, icon: <FaTwitter />, bg: "bg-blue-400", hover: "hover:bg-blue-500" },
                                { href: `https://api.whatsapp.com/send?text=${encodedGreeting}`, icon: <FaWhatsapp />, bg: "bg-green-500", hover: "hover:bg-green-600" },
                            ].map((item, i) => (
                                <motion.a
                                    key={i}
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${item.bg} ${item.hover} p-4 rounded-full text-white transition`}
                                >
                                    {item.icon}
                                </motion.a>
                            ))}
                        </motion.div>
                    </>
                )}
            </div>
        </motion.div>
    );
};

export default EidGreeting;