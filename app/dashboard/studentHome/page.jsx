import StudentHome from "@/components/StudentHome/StudentHome";

export const metadata = {
    title: "Student Dashboard | EduGenie",
    description: "Access your enrolled courses, track progress, and manage your student dashboard.",
};

const page = () => {
    return (
        <div>
            <StudentHome />
        </div>
    );
};

export default page;