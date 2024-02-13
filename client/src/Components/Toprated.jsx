import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import card from "../Assets/card.jpg"
function Toprated() {
  const [sitters, setSitters] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/home/topratedsitters"
        );
        setSitters(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const CustomPrevArrow = ({ onClick }) => (
    <button
      className="absolute top-60 -left-10 rounded-full border border-[#FF90BC] p-3  transform -translate-y-1/2 transition bg-[#FF90BC] text-white z-10"
      onClick={() => {
        console.log("Prev button clicked");
        onClick();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-5 w-5 rtl:rotate-180"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
    </button>
  );
  const CustomNextArrow = ({ onClick }) => (
    <button
      className="absolute ml-4 top-60 -right-10 rounded-full border border-[#FF90BC] p-3 bg-[#FF90BC] text-white transform -translate-y-1/2 transition  z-10"
      onClick={onClick}
    >
      <svg
        className="h-5 w-5 rtl:rotate-180"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 5l7 7-7 7"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </button>
  );
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="mt-20 my-8 lg:my-10 lg:mt-20 container px-6 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-gray-300">
        <div>
          <h3 className=" font_heading text-4xl leading-tight text-[#FFC0D9] dark:text-gray-100">
            BabySitters
          </h3>
        </div>
        <div className="mt-6 md:mt-0 px-6">
          <Link to="/sitters">
            <button className="linear rounded-[20px] bg-[#FF90BC] px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-[#FFC0D9] active:bg-brand-700">
              View All
            </button>
          </Link>
        </div>
      </div>


      <div className="bg-white flex justify-center items-center py-6 md:w-full">
        <div className="container mx-auto px-4 ">
  <Slider {...settings}>
    {sitters && sitters.sitters ? (
      sitters.sitters.map((sitter) => (
        <div key={sitter.id} className="mb-8">
          <div className="rounded-t-lg h-32 overflow-hidden">
            <img className="object-cover object-top w-full" src={card} alt="cardbackground" />
          </div>
          <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
            <img className="object-cover object-center h-32" src={sitter.image} alt={sitter.user_name} />
          </div>
          <div className="text-center mt-2">
            <h2 className="font-semibold">{sitter.user_name}</h2>
            <p className="text-gray-500">Experience: {sitter.experience_level}</p>
          </div>
          <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
            <li className="flex flex-col items-center justify-around">
              <svg className="w-4 fill-current text-[#FF90BC]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <div>{sitter.rate}</div>
            </li>
          </ul>
          <div className="p-4 border-t mx-8 mt-2">
            <button className="w-1/2 block mx-auto rounded-full bg-[#FF90BC] hover:shadow-lg font-semibold text-white px-6 py-2">show more</button>
          </div>
        </div>
      ))
    ) : (
      <p>Loading...</p>
    )}
  </Slider>
</div>
</div>



    </>
  );
}

export default Toprated;
