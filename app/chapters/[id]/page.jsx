import ChapterPage from "@/components/ChapterPage/ChapterPage";

export const metadata = {
    title: "Chapter Details | EduGenie",
    description: "View and explore AI-generated chapters for your selected course."
};

const Page = () => {
    return (
        <div className="w-full flex min-h-screen items-center justify-center bg-cover bg-center flex-col"
            style={{
                backgroundImage: "url('/assets/background.jpg')",
                backgroundAttachment: "fixed",
            }}>
            <ChapterPage />
        </div>
    );
};

export default Page;