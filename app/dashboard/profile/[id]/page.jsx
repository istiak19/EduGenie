import EditProfile from '@/components/Profile/EditProfile';

export const metadata = {
    title: "Edit Profile | EduGenie",
    description: "Update your personal information and customize your EduGenie profile.",
};

const Page = () => {
    return (
        <div>
            <EditProfile />
        </div>
    );
};

export default Page;