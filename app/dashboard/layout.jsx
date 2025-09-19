import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar/Sidebar";
import Image from "next/image";
import Link from "next/link";

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-neutral-900">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-teal-600 text-white">
                <div className="h-full min-h-screen flex flex-col">
                    {/* Logo Section */}
                    <div className="flex items-center gap-2 px-4 py-4 border-b border-teal-500">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/Edugine-logo.png"
                                alt="EduGenie Logo"
                                width={40}
                                height={40}
                                className="rounded-md"
                            />
                            <span className="text-lg font-bold tracking-wide">
                                EduGenie
                            </span>
                        </Link>
                    </div>

                    {/* Sidebar Menu */}
                    <div className="flex-1 px-4 py-6 overflow-y-auto">
                        <Sidebar />
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-col flex-1">
                <main>
                    <div className="bg-white dark:bg-neutral-800 shadow-md rounded-xl p-4 max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default DashboardLayout;