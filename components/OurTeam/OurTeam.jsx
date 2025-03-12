import Image from "next/image";
import React from "react";
import profileImage from "../../public/assets/profile.png";

const OurTeam = () => {
  return (
    <div className="w-11/12 mx-auto ">
      <div className="flex items-center justify-center">
        <h1 className="text-5xl font-bold">Our Team</h1>
      </div>
      {/* team section  */}

      <div>
        {/* div grid content  */}
        <div>
          <div className="w-[200px] h-[200px] rounded-full overflow-hidden">
            <Image
              className="rounded-full object-cover"
              src={profileImage}
              width={200}
              height={200}
              alt="profile image"
            />
          </div>
          <h1>Member name</h1>
          <p>Member role</p>
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default OurTeam;
