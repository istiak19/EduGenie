import ApprovalBlog from "@/components/ApprovalBlog/ApprovalBlog";


const EducatorApprovalBlog = () => {
    return (
        <div className="w-full flex rounded-xl min-h-screen items-center justify-center bg-cover bg-center flex-col"
            style={{
                backgroundImage: "url('/assets/background.jpg')",
                backgroundAttachment: "fixed",
            }}>
            <ApprovalBlog />
        </div>
    );
};

export default EducatorApprovalBlog;