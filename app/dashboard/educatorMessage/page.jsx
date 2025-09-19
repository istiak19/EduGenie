import EducatorMessage from "@/components/EducatorMessage/EducatorMessage";

export const metadata = {
    title: "Message | EduGenie",
    description: "Read a special message from our educators at EduGenie to guide your learning journey."
};

const page = () => {
    return (
        <div
            className="w-full bg-cover bg-center flex-col px-4 rounded-xl sm:px-6 lg:px-8 py-10"
            style={{
                backgroundImage: "url('/assets/background.jpg')",
                backgroundAttachment: "fixed",
            }}
        >
            <EducatorMessage />
        </div>
    );
};

export default page;