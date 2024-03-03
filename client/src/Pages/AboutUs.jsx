import React, { useState, useEffect } from "react";
import OurServices from "../Components/OurServices";

import about from "../Assets/about.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

function AboutUs() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <section class="flex items-center bg-[#FFC0D9] mt-10 xl:h-screen font-poppins dark:bg-gray-800 ">
        <div class="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
          <div class="flex flex-wrap ">
            <div class="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
              <div data-aos="fade-right" class="relative lg:max-w-md">
                <img
                  src={about}
                  alt="about"
                  class="relative rounded-3xl z-10 object-cover w-full  h-96"
                />
              </div>
            </div>
            <div
              data-aos="fade-left"
              class="w-full px-6 mb-10 lg:w-1/2 lg:mb-0 "
            >
              <div class="pl-4 mb-6 border-l-4 border-[#FF90BC] ">
                <span class="text-sm text-gray-600 uppercase dark:text-gray-400">
                  Who we are?
                </span>
                <h1 class="mt-2 text-3xl font-black text-[#FF90BC] md:text-5xl ">
                  About Us
                </h1>
              </div>
              <p class="mb-6 text-base leading-7 text-indigo-950 ">
                Welcome to SitterSphere! At SitterSphere, we understand the
                unique challenges that working mothers face when seeking
                professional babysitters. Our mission is to provide safe and fun
                experiences for kids while offering reliable support to working
                mothers. With years of experience in childcare and a dedication
                to excellence, our team of professional babysitters is here to
                ensure a secure and enjoyable environment for your children.
                We're honored to be a part of your childcare journey and look
                forward to supporting you every step of the way. Let's make
                babysitting a worry-free experience together! The SitterSphere
                Team
              </p>
            </div>
          </div>
        </div>
      </section>
      <OurServices />
    </>
  );
}

export default AboutUs;
