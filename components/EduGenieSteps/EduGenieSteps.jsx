"use client";

const EduGenieSteps = () => {
    const steps = [
        {
            id: 1,
            title: "Explore Your Interests",
            description: "Discover a wide range of subjects and find what truly inspires you to learn and grow.",
            image: "/assets/icons/book.png",
        },
        {
            id: 2,
            title: "Choose the Perfect Course",
            description: "Access expertly crafted courses designed to match your goals and learning style.",
            image: "/assets/icons/course-search.png",
        },
        {
            id: 3,
            title: "Start Your Learning Journey",
            description: "Enroll easily and engage with interactive lessons, quizzes, and real-world projects.",
            image: "/assets/icons/enroll-icon.png",
        },
    ];

    return (
        <section
            className="py-20 px-4 bg-fixed bg-center bg-no-repeat bg-cover"
            style={{
                backgroundImage: "url('/assets/edu.jpg')",
            }}
        >
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {steps.map((step) => (
                    <div
                        key={step.id}
                        className="bg-white dark:bg-gray-900 transition-colors duration-500 p-5 text-center group hover:bg-teal-500 dark:hover:bg-teal-500 rounded-md shadow-md"
                    >
                        <div className="flex justify-center mb-6">
                            <img
                                src={step.image}
                                alt={step.title}
                                className="w-20 h-20 object-contain transition-transform duration-300 group-hover:scale-110"
                            />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-white transition-colors duration-300">
                            {step.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mt-4 text-base group-hover:text-white transition-colors duration-300">
                            {step.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default EduGenieSteps;