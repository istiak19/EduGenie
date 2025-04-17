import Chatbot from "@/components/chatbot/Chatbot";
import Chat from "@/components/chatbot/Chat";
import CourseCarousel from "@/components/CourseCarousel";
import EidGreeting from "@/components/EidGreeting/EidGreeting";
import HeroBanner from "@/components/HeroBanner";
import HowItWorks from "@/components/HowItWorks";
import SuccessStories from "@/components/SuccessStories.jsx";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <EidGreeting />
      <CourseCarousel />
      <SuccessStories />
      <HowItWorks />
      
      {/* Chatbot Section */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-xl w-full text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          How can we help you today?
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Our chatbot is here to assist with your inquiries and provide
          recommendations.
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
     
      <Chat />
    </div>
  );
}
