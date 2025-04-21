import AllBlogs from "@/components/AllBlogs";

export const metadata = {
  title: "All Blogs | EduGenie",
  description: "Explore blogs created by learners and experts. Share your ideas with the community!",
};

const page = () => {
  return (
    <div className="w-full flex min-h-screen items-center justify-center bg-cover bg-center flex-col"
      style={{
        backgroundImage: "url('/assets/background.jpg')",
        backgroundAttachment: "fixed",
      }}>
      <AllBlogs />
    </div>
  );
};

export default page;