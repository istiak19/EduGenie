import Blogs from "@/components/Blogs/Blogs";

export const metadata = {
  title: "All Blogs | EduGenie",
  description: "Explore blogs created by learners and experts. Share your ideas with the community!",
};

const page = () => {
  return (
    <div>
      <Blogs />
    </div>
  );
};

export default page;