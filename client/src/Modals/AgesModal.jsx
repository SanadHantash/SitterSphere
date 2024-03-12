import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import months from "../Assets/0-12months.svg";
import years1_2 from "../Assets/1-2years.svg";
import years2_3 from "../Assets/1-2years.svg";
import years3_5 from "../Assets/2-3years.svg";
import years5 from "../Assets/5+years.svg";

function AgesModal() {
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
        Ages
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4  m-10">
        {RequestDetails.request &&
          RequestDetails.request[0] &&
          RequestDetails.request[0]["months_0_12"] && (
            <div className="bg-[#F9F9E0] bg-opacity-60 p-4 rounded-md">
              <div class="inline-flex align-middle justify-center items-center select-none text-white">
                <div className="flex items-center">
                  <img
                    src={months}
                    alt="0-12 months Icon"
                    className="w-14 h-14 inline-block mr-2"
                  />
                  <h2 className="title-font font-medium text-xl text-[#FF90BC]">
                    0-12 months
                  </h2>
                </div>
              </div>
              <br />
            </div>
          )}

        {RequestDetails.request &&
          RequestDetails.request[0] &&
          RequestDetails.request[0]["years_1_2"] && (
            <div className="bg-[#F9F9E0] bg-opacity-60 p-4 rounded-md">
              <div class="inline-flex align-middle justify-center items-center select-none text-white">
                <div className="flex items-center">
                  <img
                    src={years1_2}
                    alt="1-2 years Icon"
                    className="w-14 h-14 inline-block mr-2"
                  />
                  <h2 className="title-font font-medium text-xl text-[#FF90BC]">
                    1-2 years
                  </h2>
                </div>
              </div>
              <br />
            </div>
          )}

        {RequestDetails.request &&
          RequestDetails.request[0] &&
          RequestDetails.request[0]["years_2_3"] && (
            <div className="bg-[#F9F9E0] bg-opacity-60 p-4 rounded-md">
              <div class="inline-flex align-middle justify-center items-center select-none text-white">
                <div className="flex items-center">
                  <img
                    src={years2_3}
                    alt="2-3 years Icon"
                    className="w-14 h-14 inline-block mr-2"
                  />
                  <h2 className="title-font font-medium text-xl text-[#FF90BC]">
                    2-3 years
                  </h2>
                </div>
              </div>
              <br />
            </div>
          )}

        {RequestDetails.request &&
          RequestDetails.request[0] &&
          RequestDetails.request[0]["years_3_5"] && (
            <div className="bg-[#F9F9E0] bg-opacity-60 p-4 rounded-md">
              <div class="inline-flex align-middle justify-center items-center select-none text-white">
                <div className="flex items-center">
                  <img
                    src={years3_5}
                    alt="reading Icon"
                    className="w-14 h-14 inline-block mr-2"
                  />
                  <h2 className="title-font font-medium text-xl text-[#FF90BC]">
                    3-5 years
                  </h2>
                </div>
              </div>
              <br />
            </div>
          )}

        {RequestDetails.request &&
          RequestDetails.request[0] &&
          RequestDetails.request[0]["years_5"] && (
            <div className="bg-[#F9F9E0] bg-opacity-60 p-4 rounded-md">
              <div class="inline-flex align-middle justify-center items-center select-none text-white">
                <div className="flex items-center">
                  <img
                    src={years5}
                    alt="+5 years Icon"
                    className="w-14 h-14 inline-block mr-2"
                  />
                  <h2 className="title-font font-medium text-xl text-[#FF90BC]">
                    +5 years
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

export default AgesModal;
