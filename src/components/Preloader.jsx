import React from 'react';
import logo from '../assets/logo.png';

const Preloader = () => {
  return (
    <div
      id="preloader-active"
      className="fixed inset-0 z-[999999] bg-[#f7f7f7] flex items-center justify-center transition-all duration-700"
    >
      <div className="relative">
        {/* Spinner Circle */}
        <div className="w-[80px] h-[80px] border border-t-[#f15f22] border-b-transparent border-l-transparent border-r-transparent rounded-full bg-white shadow-[0_1px_5px_rgba(35,181,185,0.15)] animate-spin transition-all duration-900 z-10"></div>

        {/* Loader Image */}
        <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 z-[200] text-center transition-all duration-700">
          <img src={logo} alt="Loading..." className="max-w-[160px] opacity-60 mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default Preloader;