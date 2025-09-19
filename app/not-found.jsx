"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col md:flex-row justify-center items-center min-h-screen text-center md:text-left space-y-6 md:space-y-0 md:space-x-10 px-6 bg-gradient-to-r from-teal-200 to-blue-300">
            <div className="space-y-5">
                <h2 className="text-4xl font-bold text-teal-600">404 - Not Found</h2>
                <p className="text-lg text-gray-600 font-medium">
                    Oops! The page you're looking for doesn't exist.
                </p>
                <Link
                    href="/"
                    className="px-6 py-3 border border-teal-500 text-teal-600 font-semibold rounded-lg shadow-md transition duration-300 hover:bg-teal-500 hover:text-white hover:border-none border-b-4"
                >
                    Return Home
                </Link>
            </div>
            <div>
                <Image
                    width={500}
                    height={550}
                    src="/assets/errorPic.jpg"
                    alt="Error page"
                    className="rounded-lg shadow-lg"
                />
            </div>
        </div>
    );
}