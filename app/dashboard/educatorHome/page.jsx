import EducatorHome from "@/components/EducatorHome/EducatorHome";

export const metadata = {
    title: "Educator Dashboard | EduGenie",
    description: "Manage and monitor your created AI-powered courses from your educator dashboard.",
};

const page = () => {
    return (
        <div>
            <EducatorHome />
        </div>
    );
};

export default page;