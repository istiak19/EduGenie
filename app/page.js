import Chat from "@/components/chatbot/Chat";
// import CourseCarousel from "@/components/CourseCarousel";
import CourseCategories from "@/components/CourseCategories/CourseCategories";
// import HowItWorks from "@/components/HowItWorks";
import NewBanner from "@/components/NewBanner/NewBanner";
// import EidGreeting from "@/components/EidGreeting/EidGreeting";
import StudentFeedback from "@/components/StudentFeedback/StudentFeedback";
import CoursePromo from "@/components/CoursePromo/CoursePromo";
import EduGenieSteps from "@/components/EduGenieSteps/EduGenieSteps";
import HeroSection from "@/components/HeroSection/HeroSection";

export default function Home() {
  return (
    <div>
      <NewBanner />
      {/* <EidGreeting /> */}
      {/* <CourseCarousel /> */}
      <CourseCategories />
      <CoursePromo />
      <StudentFeedback />
      <EduGenieSteps />
      <HeroSection />
      <Chat />
    </div>
  );
}
