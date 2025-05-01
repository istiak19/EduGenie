import Chat from "@/components/chatbot/Chat";
import CourseCarousel from "@/components/CourseCarousel";
import HowItWorks from "@/components/HowItWorks";
import NewBanner from "@/components/NewBanner/NewBanner";
// import EidGreeting from "@/components/EidGreeting/EidGreeting";
import StudentFeedback from "@/components/StudentFeedback/StudentFeedback";

export default function Home() {
  return (
    <div>
      <NewBanner/>
      {/* <EidGreeting /> */}
      <CourseCarousel />
      <HowItWorks />
      <StudentFeedback />
      <Chat />
    </div>
  );
}
