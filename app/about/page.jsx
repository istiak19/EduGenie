import AboutUs from '@/components/AboutUs/AboutUs';
import Contact from '@/components/Contact/Contact';
import OurTeam from '@/components/OurTeam/OurTeam';
import React from 'react';

const page = () => {
    return (
        <div>
            <AboutUs></AboutUs>
            <OurTeam></OurTeam>
            {/* ---------- */}
            <Contact/>
        </div>
    );
};

export default page;