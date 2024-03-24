import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useCookies } from "react-cookie";
import { useParams, Link } from "react-router-dom";
import AddRequest from "../Modals/AddFamilyRequest";
import AddFamilyRequest from "../Modals/AddFamilyRequest";
import SitterBaby from "../Assets/sitterwithbaby.png";
import FamilyAppications from "../Modals/FamilyApplications";
import deletee from "../Assets/delete.svg";

function Profilefamily() {
  const [requests, setRequests] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showApplicationsModal, setShowApplicationsModal] = useState(false);
  const [cookies] = useCookies(["token"]);
  const token = cookies.Token;

  const showConfirmationDialog = (requestId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
        ignoreApplication(requestId);
      }
    });
  };

  const ignoreApplication = async (requestId) => {
    try {
      axios.defaults.headers.common["Authorization"] = token;
      await axios.put(
        `http://localhost:8080/profile/request/${requestId}/delete`
      );
      setRequests(requests.filter((request) => request.id !== requestId));
      console.log(`Request ${requestId} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting sitter ${requestId}:`, error);
    }
  };

  const openModal = () => {
    setShowCreateModal(true);
  };

  const closeModal = () => {
    setShowCreateModal(false);
  };

  const addedRequest = (application) => {
    console.log("Application added:", application);
  };

  const RequestSitters = (selectedCourse) => {
    setSelectedRequest(selectedCourse);
    setShowApplicationsModal(
      (prevShowApplicationsModal) => !prevShowApplicationsModal
    );
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
                    <div className="flex flex-row">
                      <button
                        type="button"
                        onClick={() => RequestSitters(request)}
                      >
                        <img className="h-10 w-10" src={SitterBaby} alt="" />
                      </button>

                      <button
                        type="button"
                        onClick={() => showConfirmationDialog(request.id)}
                        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      >
                        <img className="h-10 w-10" src={deletee} alt="" />
                      </button>
                    </div>
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
      {showCreateModal && (
        <AddFamilyRequest
          closeModal={() => setShowCreateModal(false)}
          addedRequest={addedRequest}
        />
      )}
      {showApplicationsModal && (
        <FamilyAppications
          request={selectedRequest}
          closeModal={() => setShowApplicationsModal(false)}
          getApplications={RequestSitters}
        />
      )}
    </>
  );
}

export default Profilefamily;
