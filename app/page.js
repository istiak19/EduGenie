import Chat from "@/components/chatbot/Chat";
import CourseCarousel from "@/components/CourseCarousel";
import HeroBanner from "@/components/HeroBanner";
import HowItWorks from "@/components/HowItWorks";
// import EidGreeting from "@/components/EidGreeting/EidGreeting";
import StudentFeedback from "@/components/StudentFeedback/StudentFeedback";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      {/* <EidGreeting /> */}
      <CourseCarousel />
      <HowItWorks />
      <StudentFeedback />
      <Chat />
    </div>
  );
}
