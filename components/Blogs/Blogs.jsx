"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const image_key = process.env.NEXT_PUBLIC_IMAGE_KEY;

const Blogs = () => {
    const router = useRouter();
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const form = e.target;

        let photoURL = "";

        // Upload the photo if selected
        if (selectedPhoto) {
            const formData = new FormData();
            formData.append("image", selectedPhoto);

            try {
                const response = await fetch(`https://api.imgbb.com/1/upload?key=${image_key}`, {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error("Failed to upload image");
                }

                const result = await response.json();
                photoURL = result.data.url;
            } catch (error) {
                Swal.fire("Image Upload Failed", "Please try again later", "error");
                setSubmitting(false);
                return;
            }
        }

        const blog = {
            title: form.title.value,
            content: form.content.value,
            photo: photoURL,
            approval: false,
        };

        try {
            const res = await fetch("/api/blogs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(blog),
            });

            const response = await res.json();
            if (response.insertedId) {
                form.reset();
                setSelectedPhoto(null);
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Your blog was created successfully!",
                    showConfirmButton: false,
                    timer: 1500,
                });

                setTimeout(() => {
                    router.push("/dashboard/educatorApprovalBlog");
                }, 1600);
            }
        } catch (err) {
            Swal.fire("Error", "Something went wrong while creating the blog", "error");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="py-8 px-4 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
                <h2 className="text-3xl font-bold text-teal-700 mb-6 text-center">
                    Create a Blog
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                            Blog Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Enter blog title"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-teal-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="photo" className="block text-gray-700 font-medium mb-2">
                            Blog Cover Image
                        </label>
                        <input
                            id="photo"
                            name="photo"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setSelectedPhoto(e.target.files[0])}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <div>
                        <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
                            Blog Content
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            placeholder="Enter blog content"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md h-40 resize-none focus:outline-none focus:ring focus:border-teal-400"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className={`w-full py-3 cursor-pointer rounded-md font-semibold transition ${submitting
                                ? "bg-teal-300 cursor-not-allowed"
                                : "bg-teal-600 hover:bg-teal-700 text-white"
                            }`}
                    >
                        {submitting ? "Creating..." : "Create Blog"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Blogs;