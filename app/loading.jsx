"use client";

import Player from "@/lib/dynamicLottiePlayer";

const Loading = () => {
    return (
        <div className="flex items-center justify-center w-full min-h-[calc(100vh-305px)] bg-white dark:bg-gray-900">
            <Player
                autoplay
                loop
                src="/assets/lottie/loading.json"
                style={{ height: "200px", width: "200px" }}
            />
        </div>
    );
};

export default Loading;