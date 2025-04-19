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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </span>

            <span>
              {" "}
              dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui ocia deserunt mollit anim id est
              laborum.
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
