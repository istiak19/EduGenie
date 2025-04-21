import EducatorHome from "@/components/EducatorHome/EducatorHome";

export const metadata = {
    title: "Educator Dashboard | EduGenie",
    description: "Manage and monitor your created AI-powered courses from your educator dashboard.",
};

const page = () => {
    return (
        <div className="w-full flex items-center justify-center bg-cover bg-center flex-col"
            style={{
                backgroundImage: "url('/assets/background.jpg')",
                backgroundAttachment: "fixed",
            }}>
            <EducatorHome />
        </div>
    );
};

export default page;