"use client";
import AllBlogs from "@/components/AllBlogs";
import React, { useState } from "react";
import Swal from "sweetalert2";

const Page = () => {
  const [createBlogOpen, setCreateBlogOpen] = useState(false);
  const [refetchBlogs, setRefetchBlogs] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    console.log("Title:", form.title.value);
    console.log("Content:", form.content.value);

    const blog = {
      title: form.title.value,
      content: form.content.value,
      approval: false,
    };
    const res = await fetch("https://genie-one-xi.vercel.app/api/blogs", {
      method: "POST",
      body: JSON.stringify(blog),
    });
    const response = await res.json();
    // console.log(response);
    if (response.insertedId) {
      setRefetchBlogs((prev) => prev + 1);
      setCreateBlogOpen(false)
      form.reset();
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Your blog created successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="py-20 px-4 max-w-xl mx-auto">
      <div className="flex justify-end">
        <button
          onClick={() => {
            setCreateBlogOpen((prev) => !prev);
          }}
          className={`btn  ${createBlogOpen ? " btn-error" : "btn-accent"}`}
        >
          {createBlogOpen ? "Cancel" : "Create Blog"}
        </button>
      </div>
      {createBlogOpen && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Create a Blog</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter blog title"
              name="title"
              required
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <textarea
              placeholder="Enter blog content"
              name="content"
              required
              className="w-full p-2 border border-gray-300 rounded mb-4 h-40"
            />

            <button type="submit" className="btn btn-success">
              Create Blog
            </button>
          </form>
        </div>
      )}
      <AllBlogs refetchBlogs={refetchBlogs} />
    </div>
  );
};

export default Page;
