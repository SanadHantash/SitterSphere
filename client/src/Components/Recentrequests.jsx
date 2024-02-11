import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import cooking from "../Assets/cooking.svg";
import firstaid from "../Assets/firstaid.svg";
import nonsmoker from "../Assets/nonsmoker.svg";
import draw from "../Assets/draw.svg";
import driver from "../Assets/car.svg";

function Recentrequests() {
  const [requests, setRequests] = useState([]);

  const CustomPrevArrow = ({ onClick }) => (
    <button
      className="absolute top-12 left-10 rounded-full border border-[#FFC0D9] p-3 text-[#FFC0D9] transform -translate-y-1/2 transition hover:bg-[#FFC0D9] hover:text-white z-10"
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
      className="absolute ml-4 top-12 left-20 rounded-full border border-[#FFC0D9] p-3 text-[#FFC0D9] transform -translate-y-1/2 transition hover:bg-[#FFC0D9] hover:text-white z-10"
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
    // dots: true,
    infinite: true,
    speed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/home/recentrequests")
      .then((response) => {
        if (response.data.success) {
          setRequests(response.data.requests);
        } else {
          console.error("Failed to fetch workshops.");
        }
      })
      .catch((error) => {
        console.error("Error fetching workshops:", error);
      });
  }, []);

  return (
    <>
      <div className="mt-20 my-8 lg:my-18 container px-6 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-gray-300">
        <div>
          <h3 className="font_heading text-4xl  leading-tight text-[#FF90BC] dark:text-gray-100">
            Check our Recent requests
          </h3>
        </div>
        <div className="mt-6  px-6 md:mt-0">
          <Link to="/request">
            <button className="linear rounded-[20px] bg-[#FF90BC] px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-[#FFC0D9] active:bg-brand-700">
              View All
            </button>
          </Link>
        </div>
      </div>
      <section>
        <Slider {...settings}>
          {requests.map((request, index) => (
            <div
              key={index}
              className="mx-auto max-w-screen-2xl px-4 py-10 sm:px-6 lg:px-8"
            >
              <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
                <div className="relative z-10 lg:py-16">
                  <div className="relative h-64 sm:h-80 lg:h-full">
                    <img
                      alt={request.title}
                      src={request.image}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div className="relative flex items-center bg-[#FFC0D9]">
                  <span className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-[#FFC0D9]"></span>

                  <div className="p-8 sm:p-16 lg:p-24">
                    <h2 className="text-2xl font-bold sm:text-3xl">
                      {request.title}
                    </h2>
                    <p className="mt-4 text-gray-600">{request.description}</p>
                    <div className="flex items-center mt-4 text-gray-600">
                      {request.cooking && (
                        <img
                          src={cooking}
                          alt="Cooking Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}

                      {request.draw && (
                        <img
                          src={draw}
                          alt="draw platte Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}

                      {request.drivers_license && (
                        <img
                          src={driver}
                          alt="driver license Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}

                      {request.first_aid && (
                        <img
                          src={firstaid}
                          alt="firstaid Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}
                      {request.non_smoker && (
                        <img
                          src={nonsmoker}
                          alt="nonsmoker Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}
                    </div>

                    <Link
                      to={`/requestsDetail/${request.id}`}
                      className="mt-8 inline-block rounded border border-[#FF90BC] bg-[#FF90BC] px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text[#FF90BC] focus:outline-none focus:ring active:text-[#FF90BC]"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>
    </>
  );
}

export default Recentrequests;
