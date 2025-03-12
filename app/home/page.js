import CourseCarousel from '@/components/CourseCarousel';
import HeroBanner from '@/components/HeroBanner';
import React from 'react';

const page = () => {
    return (
        <div>
            <HeroBanner />
            <CourseCarousel/>
        </div>
    );
};

export default page;