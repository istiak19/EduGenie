import CourseDetails from '@/components/Courses/CourseDetails';

export const metadata = {
    title: "Course Details | EduGenie",
    description: "Explore AI-powered course details.",
};

const Details = () => {
    return (
        <div className='bg-gray-900'>
            <CourseDetails />
        </div>
    );
};

export default Details;