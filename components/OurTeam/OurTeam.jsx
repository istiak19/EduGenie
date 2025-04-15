import Image from "next/image";
import React from "react";
import profileImage from "../../public/assets/profile.png";

const OurTeam = () => {
  return (
    <div className="w-11/12 mx-auto my-10">
      <div className="flex items-center justify-center">
        <h1 className="text-5xl font-bold">Our Team</h1>
      </div>
      {/* team section  */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 my-10">
        {/* div grid content  */}
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-[150px] h-[150px] rounded-full overflow-hidden">
            <Image
              className="rounded-full object-cover"
              src={profileImage}
              width={150}
              height={150}
              alt="profile image"
            />
          </div>
          <h1 className="text-xl font-semibold">Istiak Ahamed</h1>
          <p className="text-md">Frontend Developer</p>
        </div>
     {/* ============ */}
     <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-[150px] h-[150px] rounded-full overflow-hidden">
            <Image
              className="rounded-full object-cover"
              src={profileImage}
              width={150}
              height={150}
              alt="profile image"
            />
          </div>
          <h1 className="text-xl font-semibold">Ambia khatun</h1>
          <p className="text-md">Fronted Developer</p>
        </div>
        {/* --------------- */}
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-[150px] h-[150px] rounded-full overflow-hidden">
            <Image
              className="rounded-full object-cover"
              src={profileImage}
              width={150}
              height={150}
              alt="profile image"
            />
          </div>
          <h1 className="text-xl font-semibold">Md Jane Alam</h1>
          <p className="text-md">Frontend Developer</p>
        </div>
        {/* --------------- */}
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-[150px] h-[150px] rounded-full overflow-hidden">
            <Image
              className="rounded-full object-cover"
              src={profileImage}
              width={150}
              height={150}
              alt="profile image"
            />
          </div>
          <h1 className="text-xl font-semibold">Showrov Ghosh</h1>
          <p className="text-md">Frontend Developer</p>
        </div>
        {/* ----------------------- */}
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-[150px] h-[150px] rounded-full overflow-hidden">
            <Image
              className="rounded-full object-cover"
              src={profileImage}
              width={150}
              height={150}
              alt="profile image"
            />
          </div>
          <h1 className="text-xl font-semibold">Tahsin</h1>
          <p className="text-md">Frontendd Developer</p>
        </div>
        {/* ---------------- */}
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-[150px] h-[150px] rounded-full overflow-hidden">
            <Image
              className="rounded-full object-cover"
              src={profileImage}
              width={150}
              height={150}
              alt="profile image"
            />
          </div>
          <h1 className="text-2xl font-semibold">Imtiaz Hossen</h1>
          <p className="text-md">Frontend Developer</p>
        </div>
        {/* --------- */}
      </div>
    </div>
  );
};

export default OurTeam;
