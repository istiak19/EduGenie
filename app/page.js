import Chatbot from "@/components/chatbot/Chatbot";
import Chat from "@/components/chatbot/Chat";
import CourseCarousel from "@/components/CourseCarousel";
import EducatorAndSubscription from "@/components/EducatorAndSubscription/EducatorAndSubscription";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import SuccessStories from "@/components/SuccessStories";
import StudentDashboard from "@/components/studentdasboard/Studentdasboard";
import EidGreeting from "@/components/EidGreeting/EidGreeting";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroBanner />
      <EidGreeting />
      <CourseCarousel />
      <HowItWorks />
      <SuccessStories />

      {/* Chatbot Section */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-xl w-full text-center mx-auto my-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          How can we help you today?
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Our chatbot is here to assist with your inquiries and provide recommendations.
        </p>

        <Chatbot />

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Need further help? Check out our{" "}
            <a href="/faq" className="text-teal-500 hover:underline">
              FAQ
            </a>{" "}
            or{" "}
            <a href="/contact" className="text-teal-500 hover:underline">
              contact us
            </a>
            .
          </p>
        </div>
      </div>

      <StudentDashboard />
      <EducatorAndSubscription />
      <Footer />
      <Chat />
    </div>
  );
}
