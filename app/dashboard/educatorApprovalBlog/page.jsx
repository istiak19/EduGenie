import ApprovalBlog from "@/components/ApprovalBlog/ApprovalBlog";

export const metadata = {
    title: "Approval Blog | EduGenie",
    description: "Manage and approve submitted blogs from educators before publishing.",
};

const EducatorApprovalBlog = () => {
    return (
        <div>
            <ApprovalBlog />
        </div>
    );
};

export default EducatorApprovalBlog;