import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useCookies } from "react-cookie";
import { useParams, Link } from "react-router-dom";
//import Addsitters[0] from "../Modals/AddFamilysitters[0]";
//import AddSitterReq from "../Modals/AddFamilysitters[0]";
import cooking from "../Assets/cooking.svg";
import firstaid from "../Assets/firstaid.svg";
import nonsmoker from "../Assets/nonsmoker.svg";
import draw from "../Assets/draw.svg";
import car from "../Assets/car.svg";
import driver from "../Assets/drive.svg";
import music from "../Assets/music.svg";
import reading from "../Assets/reading.svg";
import months from "../Assets/0-12months.svg";
import years1_2 from "../Assets/1-2years.svg";
import years2_3 from "../Assets/1-2years.svg";
import years3_5 from "../Assets/2-3years.svg";
import years5 from "../Assets/5+years.svg";
import SitterInfoModal from "../Modals/SitterInfoModal";


function ProfileSitter() {
  const [sitters, setSitters] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [cookies] = useCookies(["token"]);
  const token = cookies.Token;

  const openModal = () => {
    setShowCreateModal(true);
  };

  const closeModal = () => {
    setShowCreateModal(false);
  };



  const addedInfo = (application) => {
    console.log("Application added:", application);
  };

  useEffect(() => {
    const fetchUsersitters = async () => {
      try {
        if (!token) {
          console.error("Token not available.");
          return;
        }

        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(
          `http://localhost:8080/sitters/mydetails`
        );

        setSitters(response.data.mydetail);
        console.log(response.data.mydetail[0]);
      } catch (error) {
        console.error("Error fetching user sitters[0]s:", error);
      }
    };

    fetchUsersitters();
  }, []);
  return (
    <>
    
      <div class="bg-white  max-w-2xl shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 mt-5 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">my info</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Details and informations about me.
          </p>
        </div>
        <div class="border-t border-gray-200">
          <dl>
            {Array.isArray(sitters) && sitters.length > 0 && (
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                  Experience level
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {sitters[0].experience_level}
                </dd>
              </div>
            )}
              {Array.isArray(sitters) && sitters.length > 0 && (
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                  Rate
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {sitters[0].rate}
                </dd>
              </div>
            )}
             {Array.isArray(sitters) && sitters.length > 0 && (
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                  Description
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {sitters[0].description}
                </dd>
              </div>
            )}
             {Array.isArray(sitters) && sitters.length > 0 && (
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                 Monthly Salary
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {sitters[0].salary}$
                </dd>
              </div>
            )}
              {Array.isArray(sitters) && sitters.length > 0 && (
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                  Skills
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {sitters[0].cooking && (
                        <img
                          src={cooking}
                          alt="Cooking Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}

                      {sitters[0].draw && (
                        <img
                          src={draw}
                          alt="draw platte Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}

                      {sitters[0].can_drive && (
                        <img
                          src={driver}
                          alt="driver license Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}

                      {sitters[0].first_aid && (
                        <img
                          src={firstaid}
                          alt="firstaid Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}
                      {sitters[0].non_smoker && (
                        <img
                          src={nonsmoker}
                          alt="nonsmoker Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}
                      {sitters[0].has_car && (
                        <img
                          src={car}
                          alt="car Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}
                      {sitters[0].reading && (
                        <img
                          src={reading}
                          alt="reading Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}
                      {sitters[0].music && (
                        <img
                          src={music}
                          alt="music Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}
                </dd>
              </div>
            )}
              {Array.isArray(sitters) && sitters.length > 0 && (
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                  Ages
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {sitters[0].months_0_12 && (
                        <img
                          src={months}
                          alt="0-12 months Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}

                      {sitters[0].years_1_2 && (
                        <img
                          src={years1_2}
                          alt="1-2 years Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}

                      {sitters[0].years_2_3 && (
                        <img
                          src={years2_3}
                          alt="2-3 years Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}

                      {sitters[0].years_3_5 && (
                        <img
                          src={years3_5}
                          alt="3-5 years Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}
                      {sitters[0].years_5 && (
                        <img
                          src={years5}
                          alt="+5 years Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      <button
                  onClick={openModal}
                  className="bg-[#FF90BC] h-10 w-40 text-white rounded-md hover:bg-[#FFC0D9] mt-4"
                >
                  Add Info
                </button>
      {showCreateModal && <SitterInfoModal closeModal={() => setShowCreateModal(false)} addedInfo={addedInfo} />}
    </>
  );
}

export default ProfileSitter;
