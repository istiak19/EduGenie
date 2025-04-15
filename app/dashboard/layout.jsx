import Sidebar from "@/components/Sidebar/Sidebar";

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-teal-500 text-white">
                <div className="h-full md:min-h-screen px-5 py-4">
                    <Sidebar />
                </div>
            </aside>
            {/* Main Content */}
            <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 bg-gray-50">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;