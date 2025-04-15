import Sidebar from "@/components/Sidebar/Sidebar";

const DashboardLayout = ({ children }) => {

    return (
        <div className="flex flex-col md:flex-row">
            <div className='bg-teal-500 w-full md:w-64 min-h-screen pl-5'>
                <Sidebar/>
            </div>
            <div className="flex-1 p-4 md:p-10">
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;