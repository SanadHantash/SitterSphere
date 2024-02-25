import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import RequiremntsModal from "../Modals/RequiremntsModal";
import AgesModal from "../Modals/AgesModal";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useAuth } from "../Context/AuthContext";
import { useCookies } from "react-cookie";

function RequestDetail() {
  const [RequestDetails, setRequestDetails] = useState([]);
  const [showRequiremntsModal, setShowRequiremntsModal] = useState(false);
  const [showAgesModal, setShowAgesModal] = useState(false);
  const { id } = useParams();
  const { headers } = useAuth();
  const [cookies] = useCookies(["token"]);
  const token = cookies.Token;
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



  const handleapply = async () => {
    try {
      const applicationData = {
        requestId: id,
      };
      axios.defaults.headers.common["Authorization"] = token;
      const applyResponse = await axios.post(
        `http://localhost:8080/family/request/${id}/apply`,
        applicationData,
        { headers }
      );
  
      Swal.fire({
        icon: "success",
        title: "Application Successful!",
        text: "Your application was sent successfully.",
      });
  
      console.log("Application Response:", applyResponse.data);
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.error;
  
        if (errorMessage === "you are already applied for this request") {
          Swal.fire({
            icon: "info",
            title: "Application Info",
            text: errorMessage,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Application Failed",
            text: `Server error: ${errorMessage}`,
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Application Failed",
          text: "An error occurred during enrollment. Please try again later.",
        });
      }
    }
  };
  
  

  const toggleRequiremntsModal = () => {
    setShowRequiremntsModal(!showRequiremntsModal);
  };

  const toggleAgesModal = () => {
    setShowAgesModal(!showAgesModal);
  };

  return (
    <>
    <section className="flex mt-20 items-center bg-gradient-to-b from-[#FF90BC] to-[#F9F9E0] font-poppins dark:bg-gray-800">
      <div className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
        <div className="px-4 mb-10 md:text-center md:mb-10">
          <p className="mb-2 text-lg font-semibold text-[#FF90BC] dark:text-gray-400"></p>
          <h2 className="pb-2 text-2xl font-bold text-gray-800 md:text-4xl dark:text-gray-300">
            {RequestDetails.request && RequestDetails.request[0].title
              ? RequestDetails.request[0].title
              : "Title Not Available"}
          </h2>
          <div className="flex w-32 mt-1 mb-6 overflow-hidden rounded md:mx-auto md:mb-14">
            <div className="flex-1 h-2 bg-[#FF90BC]"></div>
            <div className="flex-1 h-2 bg-[#FFC0D9]"></div>
            <div className="flex-1 h-2 bg-[#FF90BC]"></div>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full px-4 mb-6 lg:w-full lg:mb-0">
            <img
              src={
                RequestDetails.request && RequestDetails.request[0].image
                  ? RequestDetails.request[0].image
                  : "Detail Not Available"
              }
              alt=""
              className="relative z-40 object-cover bg-cover w-full rounded-xl h-96"
            />
          </div>
          <div className="flex flex-col my-6 lg:flex-row">
            <div className="w-full lg:w-full px-4 mb-10 lg:mb-0">
              <p className="mb-4 text-xl leading-7 text-gray-500">
                {RequestDetails.request &&
                RequestDetails.request[0].description
                  ? RequestDetails.request[0].description
                  : "Description Not Available"}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center w-full px-4">
            <div className="flex">
              <button
                onClick={toggleRequiremntsModal}
                className="bg-[#FF90BC] h-10 w-40 text-white rounded-md hover:bg-[#FFC0D9]"
              >
                {showRequiremntsModal ? "Requirements" : "Requirements"}
              </button>
              <button
                onClick={toggleAgesModal}
                className="bg-[#FF90BC] h-10 w-40 text-white rounded-md hover:bg-[#FFC0D9] ml-4"
              >
                {showAgesModal ? "Ages" : "Ages"}
              </button>
            </div>
            <div>
              <button
                onClick={handleapply}
                className="bg-[#FF90BC] h-10 w-40 text-white rounded-md hover:bg-[#FFC0D9]"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  
    {showRequiremntsModal && <RequiremntsModal />}
    {showAgesModal && <AgesModal />}
  </>
  
  );
}

export default RequestDetail;
