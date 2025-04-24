import EditProfile from '@/components/Profile/EditProfile';

export const metadata = {
    title: "Edit Profile | EduGenie",
    description: "Update your personal information and customize your EduGenie profile.",
};

const Page = () => {
    return (
        <div className="w-full flex min-h-screen items-center justify-center rounded-md bg-cover bg-center flex-col"
            style={{
                backgroundImage: "url('/assets/background.jpg')",
                backgroundAttachment: "fixed",
            }}>
            <EditProfile />
        </div>
    );
};

export default Page;