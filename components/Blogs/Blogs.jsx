"use client";

import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const Blogs = () => {
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const blog = {
            title: form.title.value,
            content: form.content.value,
            approval: false,
        };

        const res = await fetch("/api/blogs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(blog),
        });
        const response = await res.json();
        if (response.insertedId) {
            form.reset();
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Your blog was created successfully!",
                showConfirmButton: false,
                timer: 1500,
            });

            // Wait a moment before redirecting
            setTimeout(() => {
                router.push("/dashboard/educatorApprovalBlog");
            }, 1600);
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
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-md transition"
                    >
                        Create Blog
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Blogs;