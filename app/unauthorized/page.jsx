"use client";
import Link from "next/link";
import Image from "next/image";

const Unauthorized = () => {
    return (
        <div className="py-16 flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md lg:max-w-lg text-center">
                <div className="w-full flex justify-center mb-6">
                    <Image
                        src="/assets/unauthorized.jpg"
                        alt="Unauthorized Access"
                        width={300}
                        height={300}
                        className="rounded-xl w-full h-auto max-w-xs sm:max-w-sm"
                    />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-red-500 mb-4">
                    Access Denied
                </h1>
                <p className="text-gray-700 text-sm sm:text-base mb-6">
                    You do not have permission to view this page. Please log in with the correct role.
                </p>
                <Link
                    href="/"
                    className="inline-block bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default Unauthorized;