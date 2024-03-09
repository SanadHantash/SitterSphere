import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useCookies } from "react-cookie";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import cooking from "../Assets/cooking.svg";
import firstaid from "../Assets/firstaid.svg";
import nonsmoker from "../Assets/nonsmoker.svg";
import draw from "../Assets/draw.svg";
import car from "../Assets/car.svg";
import driver from "../Assets/drive.svg";
import music from "../Assets/music.svg";
import reading from "../Assets/reading.svg";

function Sittfamilytimes() {
    const [familytimes,setFamilytimes] = useState([]);
    const { headers } = useAuth();
    const [cookies] = useCookies(["token"]);
    const token = cookies.Token;
    const { id } = useParams();
  
    useEffect(() => {
        const fetchTimes = async () => {
          try {
            axios.defaults.headers.common["Authorization"] = token;
            const response = await axios.get(`http://localhost:8080/dashboard/sitter/${id}/familytimes`);
            setFamilytimes(response.data.families);
        
          } catch (error) {
            console.error("Error fetching applications:", error);
          
          }
        };
    
        fetchTimes();
      }, [id]);

      const CustomPrevArrow = ({ onClick }) => (
        <button
          className="absolute top-12 left-10 rounded-full border border-[#FFC0D9] p-3 text-[#FFC0D9] transform -translate-y-1/2 transition hover:bg-[#FFC0D9] hover:text-white z-10"
          onClick={() => {
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
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
      
      };

  return (
   <>
      <div className="mt-20 my-8 lg:my-18 container px-6 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-gray-300">
        <div>
          <h3 className="font_heading text-4xl  leading-tight text-[#FF90BC] dark:text-gray-100">
            Sitt Families History
          </h3>
        </div>
      </div>

      <section >
  <Slider {...settings}>
    {familytimes.map((request, index) => (
      <div key={index} className="mx-auto max-w-screen-2xl px-4 py-10 sm:px-6 lg:px-8">
        <article className="flex flex-wrap md:flex-nowrap shadow-lg mx-auto max-w-3xl group cursor-pointer transform duration-500 hover:-translate-y-1">
          <img className="w-full max-h-full object-cover md:w-52" src={request.image} alt={request.title} />
          <div className="">
            <div className="p-5 pb-10">
              <h1 className="text-2xl font-semibold text-gray-800 mt-4">
                {request.title}
              </h1>
              <p className="text-base text-gray-400 mt-2">
                {request.description}
              </p>
              <p className="text-base text-gray-500 mt-2">
                {request.start_time}
              </p>
            </div>
            <div className="bg-[#F9F9E0] p-5 w-full">
              <div className="sm:flex sm:justify-between">
                <div>
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

                      {request.can_drive && (
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
                      {request.has_car && (
                        <img
                          src={car}
                          alt="car Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}
                      {request.reading && (
                        <img
                          src={reading}
                          alt="reading Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}
                      {request.music && (
                        <img
                          src={music}
                          alt="music Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}
                    </div>
                  </div>
                  
              </div>
            </div>
          </div>
        </article>
      </div>
    ))}
  </Slider>
</section>


  
    </>
  )
}

export default Sittfamilytimes