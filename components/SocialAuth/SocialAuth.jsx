"use client";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
const SocialAuth = () => {
    const handleSocialAuth = async (providerName) => {
        console.log(providerName);
    }

    return (
        <div className="flex space-x-6 justify-center">
            {/* Google */}
            <button
                type="button"
                onClick={() => handleSocialAuth("google")}
                className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-100 border border-blue-300 shadow-md hover:shadow-lg transition">
                <FcGoogle className="text-2xl" />
            </button>
            {/* GitHub */}
            <button
                type="button"
                onClick={() => handleSocialAuth("github")}
                className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-100 border border-blue-300 shadow-md hover:shadow-lg transition">
                <FaGithub className="text-black text-2xl" />
            </button>
        </div>
    );
};

export default SocialAuth;