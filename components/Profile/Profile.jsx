"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading/Loading";

const Profile = () => {
    const { data: session } = useSession();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/user');
                const data = await res.json();
                setUsers(data);
            } catch (error) {
                console.error("Failed to fetch users", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const singleUser = users.find(user => user?.email === session?.user?.email);

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-4 sm:p-6 md:p-8"
            style={{
                backgroundImage: "url('/assets/background.jpg')",
                backgroundAttachment: "fixed",
            }}>
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">User Profile</h1>
            {
                loading ? (
                    <div className="text-xl text-teal-600 font-semibold">
                        <Loading />
                    </div>
                ) : singleUser ? (
                    <div className="bg-white border border-teal-300 shadow-2xl rounded-2xl p-6 sm:p-8 md:p-10 max-w-[400px] w-full flex flex-col items-center">
                        <div className="w-28 h-28 flex items-center justify-center rounded-full overflow-hidden border-2 border-teal-500 bg-gray-100">
                            {
                                singleUser?.photo ? (
                                    <Image
                                        src={singleUser.photo}
                                        alt="User"
                                        width={112}
                                        height={112}
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <span className="text-3xl font-bold text-teal-600">
                                        {singleUser?.name?.[0]?.toUpperCase() ?? ""}
                                    </span>
                                )
                            }
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mt-4 text-center break-words">{singleUser?.name}</h2>
                        <p className="text-sm text-gray-600 mt-1 text-center break-words">{singleUser?.email}</p>
                        <Link href={`profile/${singleUser?._id}`}
                            className="mt-6 w-full text-center px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-300"
                        >
                            Edit Profile
                        </Link>
                    </div>
                ) : (
                    <div className="text-red-500 font-medium text-center">User not found</div>
                )
            }
        </div>
    );
};

export default Profile;