import React from 'react';
import Chatbot from '../../components/chatbot/Chatbot';
import StudentDashboard from '../../components/studentdasboard/Studentdasboard';
import EducatorAndSubscription from '../../components/EducatorAndSubscription/EducatorAndSubscription';
import FeaturedBlogs from '../../components/FeaturedBlogs/FeaturedBlogs';

const HomePage = () => {
    return (<
        div className="home-container min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6" >
        <
        h1 className="text-4xl font-bold text-teal-600 mb-4" > Welcome to Our Website! < /h1> <
        p className="text-lg text-gray-600 mb-6" > Explore courses, FAQs, and more. < /p>

                <
        div className="bg-white p-6 rounded-lg shadow-md max-w-xl w-full" >
                    <
        h2 className="text-2xl font-semibold text-gray-700 mb-4" > How can we help you today ? < /h2> <
        p className="text-sm text-gray-500 mb-6" >
                            Our chatbot is here to assist with your inquiries and provide recommendations. <
        /p>

                            <
                                Chatbot />

                            <
        div className="mt-6 text-center" >
                                <
        p className="text-gray-400 text-sm" >
                                    Need further help ? Check out our {' '} <
        a href="/faq"
                                        className="text-teal-500 hover:underline" >
                                        FAQ <
        /a>{' '}
                                        or {' '} <
        a href="/contact"
                                            className="text-teal-500 hover:underline" >
                                            contact us <
        /a>. <
        /p> <
        /div> <
        /div>

                                            <
                                                StudentDashboard />
                                            <
                                                EducatorAndSubscription />
                                            <
                                                FeaturedBlogs />
                                            <
        /div>
                                            );
};

                                            export default HomePage;