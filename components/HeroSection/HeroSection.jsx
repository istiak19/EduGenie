'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
    return (
        <div className="bg-[#fafafa] text-center py-24 px-6 md:px-10">
            {/* Small Title */}
            <p className="text-sm text-sky-500 uppercase tracking-widest font-semibold">
                Empowering Future Minds
            </p>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-4 leading-tight">
                Unlock Your True Potential with <br className="hidden sm:block" />
                <span className="text-teal-500 inline-block mt-3 relative">
                    World-Class Learning
                    <span className="absolute left-0 -bottom-2 w-full h-1 bg-teal-400 rounded-full"></span>
                </span>
            </h1>

            {/* Subheading */}
            <p className="text-gray-600 mt-8 max-w-2xl mx-auto text-lg">
                Access innovative courses, hands-on projects, and expert mentorship — all designed to help you thrive in today’s fast-changing world.
            </p>

            {/* Features */}
            <div className="flex flex-wrap justify-center items-center gap-6 font-semibold text-gray-800 mt-10">
                {['Learn', 'Grow', 'Innovate', 'Lead', 'Achieve'].map((item) => (
                    <span
                        key={item}
                        className="flex items-center gap-2 bg-white px-4 py-2 rounded-md"
                    >
                        <span className="text-teal-400">▶</span> {item}
                    </span>
                ))}
            </div>

            {/* Buttons */}
            <div className="mt-12 flex flex-wrap justify-center gap-6">
                <Link
                    href="/free-trial"
                    className="bg-teal-500 hover:bg-teal-600 text-white font-bold px-8 py-4 rounded-full flex items-center gap-2 transition transform hover:scale-105 shadow-md"
                >
                    Start Free Trial <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                    href="/join"
                    className="bg-sky-400 hover:bg-sky-500 text-white font-bold px-8 py-4 rounded-full flex items-center gap-2 transition transform hover:scale-105 shadow-md"
                >
                    Join Our Community <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                    href="/pricing"
                    className="bg-teal-500 hover:bg-teal-600 text-white font-bold px-8 py-4 rounded-full flex items-center gap-2 transition transform hover:scale-105 shadow-md"
                >
                    Explore Plans <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </div>
    );
};

export default HeroSection;