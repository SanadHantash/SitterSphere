import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Requests() {
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/family/allrequests"
        );
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {requests && requests.requests ? (
        <div className="mt-20 my-8 lg:my-10 lg:mt-20 container px-6 mx-auto md:flex-row items-start md:items-center justify-between pb-4 border-b border-gray-300 ">
          {requests.requests.map((request, index) => (
            <div
              key={index}
              className="max-w-screen-lg mx-auto bg-gradient-to-r from-[#FFC0D9] to-[#F9F9E0] p-5 sm:p-10 md:p-16 mt-20 lg:mt-15 my-8 lg:my-10"
            >
              <div className="mb-10 rounded overflow-hidden flex flex-col mx-auto">
                <a
                  href="#"
                  className="text-xl sm:text-4xl font-semibold inline-block hover:text-[#FF90BC] transition duration-500 ease-in-out inline-block mb-2"
                >
                  {request.title}
                </a>
                <div className="relative">
                  <a href="#">
                    <img
                      className="w-full"
                      src={request.image}
                      alt={request.title}
                    />
                  </a>
                  <Link
                    to={`/requestDetail/${request.id}`}
                    className="absolute z-10 text-xs bottom-0 right-0 bg-[#FF90BC] px-6 m-2 py-2 text-white hover:bg-white hover:text-[#FF90BC] transition duration-500 ease-in-out sm:flex items-center"
                  >
                    <span className="text-lg">|</span>&nbsp;&nbsp;
                    <span>Read more</span>
                  </Link>
                </div>
                <p className="text-gray-700 py-5 text-base leading-8">
                  {request.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Requests;
