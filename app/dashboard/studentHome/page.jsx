import StudentHome from "@/components/StudentHome/StudentHome";

export const metadata = {
    title: "Student Dashboard | EduGenie",
    description: "Access your enrolled courses, track progress, and manage your student dashboard.",
};

const page = () => {
    return (
        <div className="w-full flex items-center justify-center bg-cover bg-center flex-col"
            style={{
                backgroundImage: "url('/assets/background.jpg')",
                backgroundAttachment: "fixed",
            }}>
            <StudentHome />
        </div>
    );
};

export default page;