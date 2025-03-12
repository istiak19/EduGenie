import React from "react";
import aboutImg from "../../public/assets/about.png";
import Image from "next/image";

const AboutUs = () => {
  return (
    <div className="w-11/12 mx-auto">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-semibold">About Us</h1>
      </div>
      <div className="flex flex-col-reverse md:flex justify-center items-center gap-10 ">
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure
            <br />
            dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui ocia deserunt mollit anim id est
            laborum.
          </p>
        </div>
        <div className="">
          <Image src={aboutImg} alt="My Image" width={1000} height={1000} />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
