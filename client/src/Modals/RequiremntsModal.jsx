import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import cooking from "../Assets/cooking.svg";
import firstaid from "../Assets/firstaid.svg";
import nonsmoker from "../Assets/nonsmoker.svg";
import draw from "../Assets/draw.svg";
import car from "../Assets/car.svg";
import driver from "../Assets/drive.svg";
import music from "../Assets/music.svg";
import reading from "../Assets/reading.svg";



function RequiremntsModal() {

    const [RequestDetails, setRequestDetails] = useState([]);
const { id } = useParams();

useEffect(() => {
  const fetchRequestDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/family/request/${id}`
      );
      setRequestDetails(response.data);
      console.log("Request Details API response:", response.data);
    } catch (error) {
      console.error("Error fetching request details:", error.response);
    }
  };

  fetchRequestDetails();
}, [id]);


  return (
    <>
     <h1 className="text-3xl  text-[#FF90BC] text-center font-bold mt-20">
        Requirments
      </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-10">
        {RequestDetails.request &&
          RequestDetails.request[0] &&
          RequestDetails.request[0]["has_car"] && (
            <div className="bg-[#F9F9E0] bg-opacity-60 p-4 rounded-md">
              <div class="inline-flex align-middle justify-center items-center select-none text-white">
                <div className="flex items-center">
                  <img
                    src={car}
                    alt="car Icon"
                    className="w-14 h-14 inline-block mr-2"
                  />
                  <h2 className="title-font font-medium text-xl text-[#FF90BC]">
                    has Car
                  </h2>
                </div>
              </div>
              <br />
            </div>
          )}

        {RequestDetails.request &&
          RequestDetails.request[0] &&
          RequestDetails.request[0]["can_drive"] && (
            <div className="bg-[#F9F9E0] bg-opacity-60 p-4 rounded-md">
              <div class="inline-flex align-middle justify-center items-center select-none text-white">
                <div className="flex items-center">
                  <img
                    src={driver}
                    alt="steering Icon"
                    className="w-14 h-14 inline-block mr-2"
                  />
                  <h2 className="title-font font-medium text-xl text-[#FF90BC]">
                    can drive
                  </h2>
                </div>
              </div>
              <br />
            </div>
          )}

        {RequestDetails.request &&
          RequestDetails.request[0] &&
          RequestDetails.request[0]["cooking"] && (
            <div className="bg-[#F9F9E0] bg-opacity-60 p-4 rounded-md">
              <div class="inline-flex align-middle justify-center items-center select-none text-white">
                <div className="flex items-center">
                  <img
                    src={cooking}
                    alt="cooking Icon"
                    className="w-14 h-14 inline-block mr-2"
                  />
                  <h2 className="title-font font-medium text-xl text-[#FF90BC]">
                    Cooking
                  </h2>
                </div>
              </div>
              <br />
            </div>
          )}

        {RequestDetails.request &&
          RequestDetails.request[0] &&
          RequestDetails.request[0]["reading"] && (
            <div className="bg-[#F9F9E0] bg-opacity-60 p-4 rounded-md">
              <div class="inline-flex align-middle justify-center items-center select-none text-white">
                <div className="flex items-center">
                  <img
                    src={reading}
                    alt="reading Icon"
                    className="w-14 h-14 inline-block mr-2"
                  />
                  <h2 className="title-font font-medium text-xl text-[#FF90BC]">
                    read Stories
                  </h2>
                </div>
              </div>
              <br />
            </div>
          )}

        {RequestDetails.request &&
          RequestDetails.request[0] &&
          RequestDetails.request[0]["music"] && (
            <div className="bg-[#F9F9E0] bg-opacity-60 p-4 rounded-md">
              <div class="inline-flex align-middle justify-center items-center select-none text-white">
                <div className="flex items-center">
                  <img
                    src={music}
                    alt="music Icon"
                    className="w-14 h-14 inline-block mr-2"
                  />
                  <h2 className="title-font font-medium text-xl text-[#FF90BC]">
                    Music
                  </h2>
                </div>
              </div>
              <br />
            </div>
          )}

        {RequestDetails.request &&
          RequestDetails.request[0] &&
          RequestDetails.request[0]["draw"] && (
            <div className="bg-[#F9F9E0] bg-opacity-80 p-4 rounded-md">
              <div class="inline-flex align-middle justify-center items-center select-none text-white">
                <div className="flex items-center">
                  <img
                    src={draw}
                    alt="draw Icon"
                    className="w-14 h-14 inline-block mr-2"
                  />
                  <h2 className="title-font font-medium text-xl text-[#FF90BC]">
                    Draw
                  </h2>
                </div>
              </div>
              <br />
            </div>
          )}

        {RequestDetails.request &&
          RequestDetails.request[0] &&
          RequestDetails.request[0]["non_smoker"] && (
            <div className="bg-[#F9F9E0] bg-opacity-60 p-4 rounded-md">
              <div class="inline-flex align-middle justify-center items-center select-none text-white">
                <div className="flex items-center">
                  <img
                    src={nonsmoker}
                    alt="nonsmoker Icon"
                    className="w-14 h-14 inline-block mr-2"
                  />
                  <h2 className="title-font font-medium text-xl text-[#FF90BC]">
                    non Smoker
                  </h2>
                </div>
              </div>
              <br />
            </div>
          )}
        {RequestDetails.request &&
          RequestDetails.request[0] &&
          RequestDetails.request[0]["first_aid"] && (
            <div className="bg-[#F9F9E0] bg-opacity-60 p-4 rounded-md">
              <div class="inline-flex align-middle justify-center items-center select-none text-white">
                <div className="flex items-center">
                  <img
                    src={firstaid}
                    alt="first Icon"
                    className="w-14 h-14 inline-block mr-2"
                  />
                  <h2 className="title-font font-medium text-xl text-[#FF90BC]">
                    firstaid
                  </h2>
                </div>
              </div>
              <br />
            </div>
          )}
      </div>
    </>
  );
}

export default RequiremntsModal;
