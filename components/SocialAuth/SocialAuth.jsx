"use client";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SocialAuth = () => {
    const router = useRouter();
    const session = useSession();
    const handleSocialAuth = async (providerName) => {
        console.log(providerName);
        await signIn(providerName);
    }

    console.log(session)
    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/')
        }
    }, [session?.status])

    return (
        <div className="flex space-x-6 justify-center">
            {/* Google */}
            <button
                type="button"
                onClick={() => handleSocialAuth("google")}
                className="w-14 btn h-14 flex items-center justify-center rounded-full bg-gray-100 border border-blue-300 shadow-md hover:shadow-lg transition">
                <FcGoogle className="text-2xl" />
            </button>
            {/* GitHub */}
            <button
                type="button"
                onClick={() => handleSocialAuth("github")}
                className="w-14 btn h-14 flex items-center justify-center rounded-full bg-gray-100 border border-blue-300 shadow-md hover:shadow-lg transition">
                <FaGithub className="text-black text-2xl" />
            </button>
        </div>
    );
};

export default SocialAuth;