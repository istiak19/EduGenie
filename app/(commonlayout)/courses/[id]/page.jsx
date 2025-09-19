import CourseDetails from '@/components/Courses/CourseDetails';

export const metadata = {
    title: "Course Details | EduGenie",
    description: "Explore AI-powered course details.",
};

const Details = () => {
    return (
        <div className="w-full flex min-h-screen items-center justify-center bg-cover bg-center flex-col"
            style={{
                backgroundImage: "url('/assets/background.jpg')",
                backgroundAttachment: "fixed",
            }}>
            <CourseDetails />
        </div>
    );
};

export default Details;