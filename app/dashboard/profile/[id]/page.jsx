"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";

const image_key = process.env.NEXT_PUBLIC_IMAGE_KEY;

const EditProfile = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const params = useParams();

    useEffect(() => {
        const fetchSingleUser = async () => {
            try {
                const res = await fetch(`/api/user/${params.id}`);
                const data = await res.json();
                setUser(data);
            } catch (error) {
                Swal.fire("Error", "Failed to fetch user data", "error");
            }
        };

        if (params?.id) {
            fetchSingleUser();
        }
    }, [params?.id]);

    const handleProfile = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const name = e.target.name.value;
        let photoURL = user.photo;

        if (selectedPhoto) {
            const formData = new FormData();
            formData.append("image", selectedPhoto);

            const response = await fetch(`https://api.imgbb.com/1/upload?key=${image_key}`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                Swal.fire("Image Upload Failed", "Please try again later", "error");
                setSubmitting(false);
                return;
            }

            const result = await response.json();
            photoURL = result.data.url;
        }

        const userInfo = { name, photo: photoURL };

        try {
            const res = await fetch(`/api/user/${user._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userInfo),
            });

            const data = await res.json();

            if (data.modifiedCount > 0) {
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Profile updated!",
                    showConfirmButton: false,
                    timer: 1200,
                });
                router.back();
            } else {
                Swal.fire("No Changes Made", "Nothing was updated", "info");
            }
        } catch (err) {
            Swal.fire("Error", "Something went wrong", "error");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center px-4 py-8">
            <div className="bg-white shadow-lg border border-teal-300 rounded-xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center mb-6">Edit Profile</h2>
                {
                    user && (
                        <>
                            <div className="flex justify-center items-center">
                                <Image
                                    src={user?.photo || "/assets/profile.png"}
                                    alt="User"
                                    width={112}
                                    height={112}
                                    className="rounded-full border w-28 h-28"
                                />
                            </div>
                            <form onSubmit={handleProfile} className="space-y-4">
                                <div>
                                    <label className="block mb-1 font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        defaultValue={user?.name}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium text-gray-700">Photo</label>
                                    <input
                                        name="photo"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setSelectedPhoto(e.target.files[0])}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        value={user.email}
                                        readOnly
                                        className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-500"
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className={`w-full py-2 rounded-lg font-medium ${submitting
                                            ? "bg-green-300 cursor-not-allowed"
                                            : "bg-green-500 hover:bg-green-600 text-white"
                                            }`}
                                    >
                                        {submitting ? "Updating..." : "Update Profile"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => router.back()}
                                        className="w-full py-2 rounded-lg bg-teal-500 hover:bg-teal-700 font-medium"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default EditProfile;