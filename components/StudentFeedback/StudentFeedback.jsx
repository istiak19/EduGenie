import Image from 'next/image';
import { MdVerifiedUser } from 'react-icons/md';

const StudentFeedback = () => {
    return (
        <section className="relative bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-950 py-40 px-8 md:px-40 overflow-hidden transition-colors duration-500">
            {/* Decorative Circle */}
            <div className="absolute top-[20px] left-[20px] pt-5 w-72 h-72 bg-[#EFCED3] dark:bg-[#2e2e2e] rounded-full z-0"></div>

            {/* Grid Layout */}
            <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

                {/* Left Side: Cards */}
                <div className="relative space-y-6">

                    {/* Carolyn's Feedback */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md transition-colors">
                        <div className="flex items-center gap-4 mb-4">
                            <Image src="/student-2.jpg" alt="Carolyn Ortiz" width={50} height={50} className="rounded-full w-12 h-12" />
                            <p className="font-medium text-gray-800 dark:text-gray-100">Carolyn Ortiz</p>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                            "EduGenie has made learning so much more engaging and tailored to my needs. The AI-generated courses are spot-on and have helped me stay motivated and organized!"
                        </p>
                        <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
                    </div>

                    {/* Floating Rating Card */}
                    <div
                        className="absolute hidden sm:block top-[180px] left-[300px] text-white p-2 rounded-xl w-48 shadow-lg text-center text-sm bg-blue-500 bg-cover bg-blend-overlay"
                        style={{
                            backgroundImage: "url('/contour-pattern.jpg')"
                        }}
                    >
                        <p className="text-xl font-medium">4.8/5.0</p>
                        <div className="text-yellow-400 text-xs mb-1">⭐⭐⭐⭐⭐</div>
                        <p>Based on 5000+ verified reviews</p>
                    </div>

                    {/* Background Circle */}
                    <div className="absolute left-[-130px] bottom-[-150px] pt-5 w-72 h-72 bg-[#EFCED3] dark:bg-[#2e2e2e] rounded-full -z-10"></div>

                    {/* Dennis's Feedback */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md mt-12 transition-colors">
                        <div className="flex items-center gap-4 mb-4">
                            <Image src="/student-1.jpg" alt="Dennis Barrett" width={50} height={50} className="rounded-full w-12 h-12" />
                            <p className="font-medium text-gray-800 dark:text-gray-100">Dennis Barrett</p>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                            "Thanks to EduGenie, I was able to find the right mentors and personalized content that boosted my confidence and academic performance tremendously."
                        </p>
                        <div className="text-yellow-400">⭐⭐⭐⭐½</div>
                    </div>

                </div>

                {/* Right Side: Mentors + Text */}
                <div className="flex flex-col space-y-8">

                    {/* Mentor Card */}
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg max-w-sm relative transition-colors">
                        <h3 className="font-semibold text-gray-700 dark:text-gray-100 text-base mb-2">
                            100+ Verified Expert Educator
                        </h3>
                        <div className="space-y-3">
                            {[
                                { name: 'Ambia Khatun Ela', role: 'Educator at EduGenie', img: '/educator-1.jpg' },
                                { name: 'Istiak Ahamed', role: 'Educator at EduGenie', img: '/educator-2.jpg' },
                                { name: 'Showrov Kumar Ghosh', role: 'Educator at EduGenie', img: '/educator-3.jpg' },
                                { name: 'Md Jane Alam', role: 'Educator at EduGenie', img: '/educator-3.jpg' },
                            ].map((mentor, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <Image src={mentor.img} alt={mentor.name} width={36} height={36} className="rounded-full w-8 h-8" />
                                    <div>
                                        <p className="font-medium text-gray-800 dark:text-gray-100">{mentor.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 text-justify">{mentor.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Shield Icon */}
                        <div className="absolute -top-5 -right-5 w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
                            <MdVerifiedUser className='text-lg text-white' />
                        </div>
                    </div>

                    {/* Heading + CTA */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                            What Our Learners Say <br /> About EduGenie
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mt-4 text-sm md:text-base text-justify">
                            At EduGenie, we believe in empowering learners through personalized, AI-driven education. Hear directly from our students about how EduGenie has transformed their learning journeys.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StudentFeedback;