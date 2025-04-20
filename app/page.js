import Chat from "@/components/chatbot/Chat";
import CourseCarousel from "@/components/CourseCarousel";
import HeroBanner from "@/components/HeroBanner";
import HowItWorks from "@/components/HowItWorks";
import SuccessStories from "@/components/SuccessStories";
import EidGreeting from "@/components/EidGreeting/EidGreeting";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <EidGreeting />
      <CourseCarousel />
      <HowItWorks />
      <SuccessStories />
      <Chat />
    </div>
  );
}
