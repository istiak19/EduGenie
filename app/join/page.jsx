import JoinCommunityPage from "@/components/JoinCommunityPage/JoinCommunityPage";

const page = () => {
    return (
        <div
            className="w-full bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: "url('/assets/bgImage.png')",
                backgroundAttachment: "fixed",
                position: "relative",
            }}
        >
            <div
                className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-600 opacity-40"
            ></div>
            <JoinCommunityPage />
        </div>
    );
};

export default page;