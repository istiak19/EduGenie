import Profile from "@/components/Profile/Profile";

export const metadata = {
    title: "My Profile | EduGenie",
    description: "View and manage your profile on the AI Course Creator platform.",
};

const Page = () => {
    return (
        <div>
            <Profile />
        </div>
    );
};

export default Page;