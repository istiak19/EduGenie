import QuizAddForm from "@/components/QuizAddForm/QuizAddForm";

export const metadata = {
    title: "QuizAdd | EduGenie",
    description: "Explore this amazing course on QuizAdd!",
};

const page = () => {
    return (
        <div className="w-full rounded-xl bg-cover bg-center flex-col"
            style={{
                backgroundImage: "url('/assets/background.jpg')",
                backgroundAttachment: "fixed",
            }}>
            <QuizAddForm />
        </div>
    );
};

export default page;