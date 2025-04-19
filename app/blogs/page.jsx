import AllBlogs from "@/components/AllBlogs";

export const metadata = {
  title: "All Blogs | EduGenie",
  description: "Explore blogs created by learners and experts. Share your ideas with the community!",
};

const page = () => {
  return (
    <div>
      <AllBlogs />
    </div>
  );
};

export default page;