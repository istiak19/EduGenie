import React, { useEffect, useState } from "react";

const AllBlogs = ({refetchBlogs}) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch("https://genie-one-xi.vercel.app/api/blogs");
      const data = await res.json();
      console.log(data);
      setBlogs(data);
    };
    fetchBlogs();
  }, [refetchBlogs]);

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h2 className="text-2xl font-semibold mb-6">All Blogs</h2>
      <div className="space-y-6">
        {blogs.map((blog, index) => (
          <div key={index} className="p-6 bg-white rounded shadow border">
            <h3 className="text-xl font-semibold mb-2 text-blue-700">{blog.title}</h3>
            <p className="text-gray-700">{blog.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
