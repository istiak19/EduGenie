import CourseCarousel from '@/components/CourseCarousel';
import HeroBanner from '@/components/HeroBanner';
import SuccessStories from '@/components/SuccessStories.jsx';
import React from 'react';

const page = () => {
    return (
        <div>
            <HeroBanner />
            <CourseCarousel />
            <SuccessStories/>
        </div>
    );
};

export default page;