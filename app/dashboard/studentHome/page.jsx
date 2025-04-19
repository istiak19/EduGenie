// "use client";
// import { useSession } from "next-auth/react";
// import { useEffect } from "react";

import StudentHome from "@/components/StudentHome/StudentHome";

// export default function Dashboard() {
//     const { data: session } = useSession();
//     console.log(session)

//     useEffect(() => {
//         console.log("Role:", session?.user?.role);
//     }, [session]);

//     return (
//         <div>
//             <h1>Dashboard</h1>
//             <p>Role: {session?.user?.role}</p>
//         </div>
//     );
// }

export const metadata = {
    title: "Student Dashboard | EduGenie",
    description: "Access your personalized learning dashboard. View enrolled courses, progress, and upcoming lessons.",
};


const page = () => {
    return (
        <div>
            <StudentHome />
        </div>
    );
};

export default page;