import Generator from "@/components/Generator/Generator";

export const metadata = {
    title: "Generator Course | EduGenie",
    description: "Explore this amazing course on CourseGenie!",
};

const GeneratorCourse = () => {
    return (
        <div className="py-10">
            <Generator />
        </div>
    );
};

export default GeneratorCourse;