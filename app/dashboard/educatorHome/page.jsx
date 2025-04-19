import EducatorHome from "@/components/EducatorHome/EducatorHome";

export const metadata = {
    title: "Educator Dashboard | EduGenie",
    description: "Welcome to your educator dashboard. View stats, manage courses, and stay updated with the latest notifications.",
};

const page = () => {
    return (
        <div>
            <EducatorHome />
        </div>
    );
};

export default page;