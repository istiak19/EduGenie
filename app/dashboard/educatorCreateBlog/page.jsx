import Blogs from '@/components/Blogs/Blogs';

export const metadata = {
    title: "Create Blog | EduGenie",
    description: "Explore blogs created by learners and experts. Share your ideas with the community!",
};


const EducatorCreateBlog = () => {
    return (
        <div className="w-full min-h-screen rounded-xl bg-cover bg-center flex-col"
            style={{
                backgroundImage: "url('/assets/background.jpg')",
                backgroundAttachment: "fixed",
            }}>
            <Blogs />
        </div>
    );
};

export default EducatorCreateBlog;