import Generator from "@/components/Generator/Generator";

export const metadata = {
    title: "Generator Course | EduGenie",
    description: "Explore this amazing course on CourseGenie!",
};

const GeneratorCourse = () => {
    return (
        <div className="w-full py-10 rounded-xl bg-cover bg-center flex-col"
            style={{
                backgroundImage: "url('/assets/background.jpg')",
                backgroundAttachment: "fixed",
            }}>
            <Generator />
        </div>
    );
};

export default GeneratorCourse;