import Blogs from '@/components/Blogs/Blogs';

export const metadata = {
    title: "Create Blog | EduGenie",
    description: "Explore blogs created by learners and experts. Share your ideas with the community!",
};


const EducatorCreateBlog = () => {
    return (
        <div>
            <Blogs />
        </div>
    );
};

export default EducatorCreateBlog;