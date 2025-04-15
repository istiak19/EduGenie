import React from "react";
import aboutImg from "../../public/assets/about.png";
import Image from "next/image";

const AboutUs = () => {
  return (
    <div className="w-11/12 mx-auto my-10">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-semibold">About Us</h1>
      </div>
      {/* about section content  */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-10">
        <div>
          <p className="text-md md:text-xl flex flex-col gap-6">
            <span>
            EduGenie is a cutting-edge platform that empowers learners with AI-driven personalized education. Offering a range of expert-led courses across various domains like tech, business, design, marketing, and AI, it helps users achieve their learning goals faster. With features like interactive video lessons, smart quizzes,
            </span>

            <span>
              {" "}
              and personalized learning paths, EduGenie revolutionizes the learning experience. The platform’s AI assistant provides guidance every step of the way, making learning efficient and engaging. Join EduGenie today and unlock new opportunities in your educational journey.
            </span>
          </p>
        </div>
        <div className="">
          <Image src={aboutImg} alt="My Image" width={2000} height={2000} />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
