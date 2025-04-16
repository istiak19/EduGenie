import { useEffect, useState } from "react";
import Loading from "./Loading/Loading";

const AllBlogs = ({ refetchBlogs }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://genie-one-xi.vercel.app/api/blogs");
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [refetchBlogs]);

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h2 className="text-2xl font-semibold mb-6">All Blogs</h2>

      {loading ? (
        <div>
          <Loading />
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center text-gray-500 py-10">No blogs found.</div>
      ) : (
        <div className="space-y-6">
          {blogs.map((blog, index) => (
            <div key={index} className="p-6 bg-white rounded shadow border">
              <h3 className="text-xl font-semibold mb-2 text-blue-700">{blog.title}</h3>
              <p className="text-gray-700">{blog.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBlogs;