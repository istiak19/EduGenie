import CourseCarousel from '@/components/CourseCarousel';
import Footer from '@/components/Footer';
import HeroBanner from '@/components/HeroBanner';
import HowItWorks from '@/components/HowItWorks';
import SuccessStories from '@/components/SuccessStories.jsx';
import React from 'react';

const page = () => {
    return (
        <div>
            <HeroBanner />
            <CourseCarousel />
            <SuccessStories />
            <HowItWorks />
            <Footer/>
        </div>
    );
};

export default page;