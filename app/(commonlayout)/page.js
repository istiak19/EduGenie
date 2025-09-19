import Chat from "@/components/chatbot/Chat";
import CourseCategories from "@/components/CourseCategories/CourseCategories";
import CoursePromo from "@/components/CoursePromo/CoursePromo";
import EduGenieSteps from "@/components/EduGenieSteps/EduGenieSteps";
import HeroSection from "@/components/HeroSection/HeroSection";
import NewBanner from "@/components/NewBanner/NewBanner";
import StudentFeedback from "@/components/StudentFeedback/StudentFeedback";

export default function Home() {
  return (
    <div>
      <NewBanner />
      <CourseCategories />
      <CoursePromo />
      <StudentFeedback />
      <EduGenieSteps />
      <HeroSection />
      <Chat />
    </div>
  );
}
