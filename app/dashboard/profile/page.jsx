import Profile from "@/components/Profile/Profile";

export const metadata = {
    title: "User Profile | EduGenie",
    description: "View and manage your profile information on EduGenie.",
};

const Page = () => {
    return (
        <div>
            <Profile />
        </div>
    );
};

export default Page;