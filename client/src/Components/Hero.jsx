import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import heroimg from "../Assets/hh.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Hero() {



  return (
    <div className="relative bg-gradient-to-r from-[#FF90BC] to-[#FFC0D9] h-screen text-white overflow-hidden">
  <div className="absolute inset-0">
    <img src={heroimg} alt="Background Image" class="object-cover object-center w-full h-full" />
    <div className="absolute inset-0 bg-black opacity-50"></div>
  </div>
  
  <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
    <h1 className="text-5xl font-bold text-[#FF90BC] tracking-wider mb-4">Welcome to SitterSphere</h1>
    <p className="text-xl font-semibold ml-4 text-[#FF90BC] sm:text-lg ">
      Your Trusted Babysitting Haven.
     Finding the perfect babysitter is now easier than ever.
      We connect families with experienced and trustworthy babysitters for your peace of mind.</p>

  </div>
</div>
  );
}

export default Hero;
