import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useCookies } from "react-cookie";
import { useParams, Link } from "react-router-dom";
import AddRequest from "../Modals/AddFamilyRequest";
import AddFamilyRequest from "../Modals/AddFamilyRequest";
function Profilefamily() {

  const [requests, setRequests] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [cookies] = useCookies(["token"]);
  const token = cookies.Token;

  const openModal = () => {
    setShowCreateModal(true);
  };

  const closeModal = () => {
    setShowCreateModal(false);
  };

  const addedRequest = (application) => {

    console.log("Application added:", application);
  };

  useEffect(() => {
    const fetchUserRequests = async () => {
      try {
        if (!token) {
          console.error("Token not available.");
          return;
        }

        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(
          `http://localhost:8080/profile/myrequests`
        );
        if (Array.isArray(response.data.myrequests)) {
          setRequests(response.data.myrequests);
        } else {
          console.error(
            "Data received is not an array:",
            response.data.myrequests
          );
        }
        setRequests(response.data.myrequests);
      } catch (error) {
        console.error("Error fetching user requests:", error);
      }
    };

    fetchUserRequests();
  }, []);
  return (
    <>
      <div className="container mx-auto px-4 py-8">
   
        <h2 className="text-3xl font-bold text-gray-800 mb-6">All requests</h2>
        <div className="grid gap-6 lg:grid-cols-1 xl:grid-cols-1">
          {requests && requests.length > 0 ? (
            requests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  className="w-full h-40 object-cover object-center"
                  src={request.image}
                  alt={request.title}
                />
                <div className="p-4">
                  <Link
                    to={`/requestDetail/${request.id}`} // Provide a valid URL path here
                    className="text-xl font-semibold text-gray-800 hover:text-indigo-700 transition duration-300"
                  >
                    {request.title}
                  </Link>
                  <p className="text-sm text-gray-600 mt-2">
                    {request.description}
                  </p>
                  <div className="flex justify-between mt-4">
                    <p className="text-sm text-gray-700">
                      Date: {request.time}
                    </p>
                    <p className="text-sm text-gray-700">Pay: {request.pay}$</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No requests available</p>
          )}
        </div>
      </div>
      <button
                  onClick={openModal}
                  className="bg-[#FF90BC] h-10 w-40 text-white rounded-md hover:bg-[#FFC0D9] mt-4"
                >
                  Add Request
                </button>
      {showCreateModal && <AddFamilyRequest closeModal={() => setShowCreateModal(false)} addedRequest={addedRequest} />}
    </>
  );
}

export default Profilefamily;
