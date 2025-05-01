
import React from 'react';
import { FaPlay, FaCheckCircle, FaUserGraduate, FaAward } from 'react-icons/fa';

const NewBanner = () => {
  return (
     <section className="w-full bg-white py-16 px-4 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between">
      {/* Left */}
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Limitless learning at your{' '}
          <span className="bg-yellow-300 px-1 relative">
            fingertips
            <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-500 transform -translate-y-1/2 z-[-1]"></span>
          </span>
        </h1>
        <p className="text-gray-600 text-lg">
          Online learning and teaching marketplace with 5K+ courses & 10M students. Taught by experts to help you acquire new skills.
        </p>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600 items-center">
          <span className="flex items-center gap-1">
            <FaUserGraduate className="text-indigo-500" /> Learn with experts
          </span>
          <span className="flex items-center gap-1">
            <FaAward className="text-emerald-500" /> Get certificate
          </span>
          <span className="flex items-center gap-1">
            <FaCheckCircle className="text-rose-500" /> Get membership
          </span>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <button className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-md shadow">Get Started</button>
          <button className="flex items-center gap-2 text-indigo-600 font-medium">
            <div className="bg-indigo-100 p-2 rounded-full">
              <FaPlay />
            </div>
            Watch video
          </button>
        </div>
      </div>

      {/* Right */}
      <div className="md:w-1/2 mt-10 md:mt-0 relative flex justify-center items-center">
       
       <img src={"/assets/b2.png"} alt="" />


        
      </div>
    </section>
  )
}

export default NewBanner
