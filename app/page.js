import Chat from "@/components/chatbot/Chat";
import CourseCarousel from "@/components/CourseCarousel";
import HeroBanner from "@/components/HeroBanner";
import HowItWorks from "@/components/HowItWorks";
import SuccessStories from "@/components/SuccessStories";
import EidGreeting from "@/components/EidGreeting/EidGreeting";
import NewBanner from "@/components/NewBanner/NewBanner";

export default function Home() {
  return (
    <div>
      {/* <HeroBanner /> */}
      <NewBanner/>
      {/* <EidGreeting /> */}
      <CourseCarousel />
      <HowItWorks />
      <SuccessStories />
      <Chat />
    </div>
  );
}
