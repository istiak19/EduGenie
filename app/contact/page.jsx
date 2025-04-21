import Contact from '@/components/Contact/Contact';

export const metadata = {
    title: "Contact | EduGenie",
    description: "Explore this amazing course on Contact!",
};

const page = () => {
    return (
        <div className="w-full flex min-h-screen items-center justify-center bg-cover bg-center flex-col"
            style={{
                backgroundImage: "url('/assets/background.jpg')",
                backgroundAttachment: "fixed",
            }}>
            <Contact />
        </div>
    );
};

export default page;