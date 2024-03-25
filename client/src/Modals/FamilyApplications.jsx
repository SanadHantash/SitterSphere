import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import ignore from "../Assets/ignore.svg";
import accept from "../Assets/accept.png";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
function FamilyAppications({ request, closeModal }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(["token"]);
  const token = cookies.Token;
  const stripePromise = loadStripe(
    "pk_test_51O6ir2JHXfBpbbMkPbKEGUGpcDt2kKbOavmI201QuITZ8F3Y48KGAOPE3hvYfSuJcIdhDa8gk7KvAW2FeiwBDPF5004smsWbGA"
  );
  const navigate = useNavigate();
  const showConfirmationignoreDialog = (applicationId) => {
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
        ignoreApplication(applicationId);
      }
    });
  };
  const showConfirmationacceptDialog = (applicationId) => {
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
        acceptApplication(applicationId);
      }
    });
  };

  const acceptApplication = async (applicationId) => {
    try {
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.post(
        `http://localhost:8080/payment/${applicationId}`
      );

      const sessionId = response.data.id;

      const stripe = await stripePromise;

      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });
      if (error) {
        console.error("Error redirecting to checkout:", error);
      } else {
        console.log("Redirecting to /success");
        navigate(`success/${applicationId}`);
      }
      console.log("Response from backend:", response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const ignoreApplication = async (applicationId) => {
    try {
      axios.defaults.headers.common["Authorization"] = token;
      await axios.put(
        `http://localhost:8080/profile/familyapplcation/${applicationId}/ignore`
      );
      setApplications(
        applications.filter((application) => application.id !== applicationId)
      );
    } catch (error) {
      console.error(`Error deleting sitter ${applicationId}:`, error);
    }
  };
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(
          `http://localhost:8080/profile/myrequests/${request.id}/applications`
        );
        setApplications(response.data.applications);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching applications:", error);
        setLoading(false);
      }
    };

    fetchApplications();
  }, [request]);

  return (
    <div>
      <h2 className="mt-4 text-[#FF90BC] text-xl">Applications</h2>
      {loading ? (
        <p>Loading applications...</p>
      ) : (
        <>
        {applications.length > 0 ? (
          <table className="w-full table-fixed divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr className="w-full" style={{ width: "100%" }}>
                <th
                  scope="col"
                  className="px-6 py-3  text-xs font-medium text-gray-500 uppercase"
                >
                  Sitter
                </th>
                <th
                  scope="col"
                  className="px-6 py-3  text-xs font-medium text-gray-500 uppercase"
                >
                  Experience Level
                </th>
                <th
                  scope="col"
                  className="px-6 py-3  text-xs font-medium text-gray-500 uppercase"
                >
                  Rate
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                >
                  Image
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {applications.map((application) => (
                <tr key={application.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">{application.user_name}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">{application.experience_level}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">{application.rate}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">
                    <img
                      src={application.image}
                      className="h-10 w-10"
                      alt="sitter_image"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          showConfirmationignoreDialog(application.id)
                        }
                        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      >
                        <img className="h-6 w-6" src={ignore} alt="" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          showConfirmationacceptDialog(application.id)
                        }
                        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      >
                        <img className="h-6 w-6" src={accept} alt="" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No applications available</p>
        )}
      </>
      
      )}
    </div>
  );
}

export default FamilyAppications;
