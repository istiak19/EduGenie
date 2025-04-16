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
        setBlogs(data.filter((blog) => blog.approval));
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [refetchBlogs]);

  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
        Blogs
      </h2>
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No approved blogs found.
        </div>
      ) : (
        <div>
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow-md border border-gray-200 flex flex-col justify-between min-h-[250px] transition-transform hover:scale-[1.02]"
            >
              <div>
                <h3 className="text-xl font-semibold mb-2 text-blue-700">
                  {blog.title}
                </h3>
                <p className="text-gray-700 text-justify text-sm">
                  {blog.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBlogs;