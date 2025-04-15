import Link from "next/link";

const StudentPanel = () => {

    return (
        <div>
            <Link href='/dashboard/studentHome'>Home</Link>
            <Link href='/dashboard/profile'>Profile</Link>
        </div>
    );
};

export default StudentPanel;