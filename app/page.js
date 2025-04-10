import Chat from "@/components/chatbot/Chat";
import CourseCarousel from "@/components/CourseCarousel";
import EidGreeting from "@/components/EidGreeting/EidGreeting";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import SuccessStories from "@/components/SuccessStories.jsx";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <EidGreeting />
      <CourseCarousel />
      <SuccessStories />
      <HowItWorks />
      <Chat />
    </div>
  );
}
