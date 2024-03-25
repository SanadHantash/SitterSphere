import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useCookies } from "react-cookie";
import { useParams, Link } from "react-router-dom";
import months from "../Assets/0-12months.svg";
import years1_2 from "../Assets/1-2years.svg";
import years2_3 from "../Assets/1-2years.svg";
import years3_5 from "../Assets/2-3years.svg";
import years5 from "../Assets/5+years.svg";
import cooking from "../Assets/cooking.svg";
import firstaid from "../Assets/firstaid.svg";
import nonsmoker from "../Assets/nonsmoker.svg";
import draw from "../Assets/draw.svg";
import car from "../Assets/car.svg";
import driver from "../Assets/drive.svg";
import music from "../Assets/music.svg";
import reading from "../Assets/reading.svg";
function ProfileApplications() {
  const [applications, setApplications] = useState([]);
  const [cookies] = useCookies(["token"]);
  const token = cookies.Token;

  useEffect(() => {
    const fetchUserApplications = async () => {
      try {
        if (!token) {
          console.error("Token not available.");
          return;
        }

        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(
          `http://localhost:8080/profile/myapplications`
        );
        if (Array.isArray(response.data.myapplications)) {
          setApplications(response.data.myapplications);
        } else {
          console.error(
            "Data received is not an array:",
            response.data.myapplications
          );
        }
        setApplications(response.data.myapplications);
      } catch (error) {
        console.error("Error fetching user applications:", error);
      }
    };

    fetchUserApplications();
  }, []);



  return (
    <>
      {applications && applications.length > 0 ? (
        applications.map((application) => (
          <div
            key={application.id}
            className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
          >
            <div className="md:flex">
              <div className="md:shrink-0">
                <img
                  className="h-48 w-full object-cover md:h-full md:w-48"
                  src={application.image}
                  alt={application.user_name}
                />
              </div>
              <div className="p-8 flex flex-col justify-between">
                <div className="uppercase tracking-wide text-lg text-[#FF90BC] font-semibold">
                  {application.user_name}
                  {application.title}
              
                <div className="block mt-1 text-xl  text-black">
                  Children Count: {application.childern_count} {application.children_count} 

                </div>
                </div>
                <div className="flex flex-row gap-2 mt-4">
                <div className="block mt-1 text-lg font-medium text-[#FFC0D9]">
                   {application.start_time}
                   {application.time}
                </div>
                <div className="block mt-1 text-lg font-medium text-[#FFC0D9]">
                   {application.period}
                </div>
                </div>
                <div className="block mt-1 text-lg font-medium text-[#FFC0D9]">
                  {application.salary} 
                  {application.pay}$
                </div>
                </div>
              
                <div className="flex items-center mt-4 text-gray-600">
                  {application.months_0_12 && (
                    <img
                      src={months}
                      alt="0-12 months Icon"
                      className="w-8 h-8 inline-block mr-2"
                    />
                  )}

                  {application.years_1_2 && (
                    <img
                      src={years1_2}
                      alt="1-2 years Icon"
                      className="w-8 h-8 inline-block mr-2"
                    />
                  )}

                  {application.years_2_3 && (
                    <img
                      src={years2_3}
                      alt="2-3 years Icon"
                      className="w-8 h-8 inline-block mr-2"
                    />
                  )}

                  {application.years_3_5 && (
                    <img
                      src={years3_5}
                      alt="3-5 years Icon"
                      className="w-8 h-8 inline-block mr-2"
                    />
                  )}

                  {application.years_5 && (
                    <img
                      src={years5}
                      alt="+5 years Icon"
                      className="w-8 h-8 inline-block mr-2"
                    />
                  )}
                </div>
                <div className="flex items-center mt-4 text-gray-600">
                      {application.cooking && (
                        <img
                          src={cooking}
                          alt="Cooking Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}

                      {application.draw && (
                        <img
                          src={draw}
                          alt="draw platte Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}

                      {application.can_drive && (
                        <img
                          src={driver}
                          alt="driver license Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}

                      {application.first_aid && (
                        <img
                          src={firstaid}
                          alt="firstaid Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}
                      {application.non_smoker && (
                        <img
                          src={nonsmoker}
                          alt="nonsmoker Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}
                      {application.has_car && (
                        <img
                          src={car}
                          alt="car Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}
                      {application.reading && (
                        <img
                          src={reading}
                          alt="reading Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}
                      {application.music && (
                        <img
                          src={music}
                          alt="music Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}
                    </div>
              </div>
              </div>
        ))
      ) : (
        <p>No applications available</p>
      )}
    </>
  );
}

export default ProfileApplications;
