import CourseCarousel from '@/components/CourseCarousel';
import Footer from '@/components/Footer';
import HeroBanner from '@/components/HeroBanner';
import HowItWorks from '@/components/HowItWorks';
import SuccessStories from '@/components/SuccessStories.jsx';

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <CourseCarousel />
      <SuccessStories />
      <HowItWorks />
      <Footer />
    </div>

  );
}
