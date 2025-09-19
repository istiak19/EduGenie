import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <main className="min-h-dvh">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;