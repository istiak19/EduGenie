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
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: -5,
                }}
            ></div>
            <JoinCommunityPage />
        </div>
    );
};

export default page;