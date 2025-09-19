'use client';

import Link from 'next/link';

const JoinCommunityPage = () => {
    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center py-10 px-5 overflow-hidden">
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center">
                {/* Title */}
                <div className="text-center max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                        Join Our Thriving Learning Community
                    </h1>
                    <p className="mt-6 text-gray-600 text-lg">
                        Connect with passionate learners, access exclusive resources, and elevate your skills with expert guidance.
                        Let's grow, together!
                    </p>
                </div>

                {/* Features Grid */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
                    {/* Feature 1 */}
                    <div className="p-6 bg-white bg-opacity-80 rounded-xl shadow-md hover:shadow-lg transition text-center">
                        <h3 className="text-xl font-semibold text-teal-600">Expert Educator</h3>
                        <p className="mt-4 text-gray-500">
                            Get 1:1 guidance from industry experts and top educators to fast-track your journey.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="p-6 bg-white bg-opacity-80 rounded-xl shadow-md hover:shadow-lg transition text-center">
                        <h3 className="text-xl font-semibold text-sky-500">Interactive Courses</h3>
                        <p className="mt-4 text-gray-500">
                            Access hands-on, real-world focused courses curated for modern learners like you.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="p-6 bg-white bg-opacity-80 rounded-xl shadow-md hover:shadow-lg transition text-center">
                        <h3 className="text-xl font-semibold text-green-500">Vibrant Community</h3>
                        <p className="mt-4 text-gray-500">
                            Collaborate, network, and grow with a global community of passionate learners.
                        </p>
                    </div>
                </div>

                {/* Testimonial Section */}
                <div className="mt-20 max-w-4xl text-center">
                    <h2 className="text-3xl font-bold text-gray-900">What Our Students Say</h2>
                    <div className="mt-10 bg-sky-50 bg-opacity-80 p-8 rounded-xl shadow-md">
                        <p className="text-gray-600 italic">
                            “Joining this platform was the best decision I made for my career. The mentors are super supportive and the community always keeps me motivated.”
                        </p>
                        <p className="mt-4 font-semibold text-gray-900">— Sarah Ahmed, Software Engineer</p>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-16 flex flex-col items-center gap-6">
                    <Link
                        href="/register"
                        className="bg-teal-500 hover:bg-teal-700 text-black hover:text-gray-100 font-bold px-8 py-4 rounded-full"
                    >
                        Sign Up & Start Learning
                    </Link>

                    <p className="text-gray-800 text-sm">
                        Already have an account?{' '}
                        <Link href="/login" className="text-teal-800 hover:underline font-semibold">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default JoinCommunityPage;