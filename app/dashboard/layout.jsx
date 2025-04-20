import Sidebar from "@/components/Sidebar/Sidebar";

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-teal-600 text-white">
                <div className="h-full min-h-screen px-4 py-6">
                    <Sidebar />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto">
                <div className="bg-white shadow-md rounded-xl p-6 min-h-[85vh]">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;