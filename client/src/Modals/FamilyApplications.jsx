import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import ignore from "../Assets/ignore.svg"

function FamilyAppications({ request, closeModal }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(["token"]);
  const token = cookies.Token;

  const showConfirmationDialog = (applicationId) => {
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

  const ignoreApplication = async (applicationId) => {
    try {
      axios.defaults.headers.common["Authorization"] = token;
      await axios.put(
        `http://localhost:8080/profile/familyapplcation/${applicationId}/ignore`
      );
      setApplications(applications.filter((application) => application.id !== applicationId));
    } catch (error) {
      console.error(`Error deleting sitter ${applicationId}:`, error);
    }
  };
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(`http://localhost:8080/profile/myrequests/${request.id}/applications`);
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
      <h2>Applications</h2>
      {loading ? (
        <p>Loading applications...</p>
      ) : (
        <>
          {applications.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Sitter</th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Experince Level</th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Rate</th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Image</th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {applications.map((application) => (
                  <tr key={application.id}>
                    <td className="px-6 py-4">{application.user_name}</td>
                    <td className="px-6 py-4">{application.experience_level}</td>
                    <td className="px-6 py-4">{application.rate}</td>
                    <td className="px-6 py-4">   <img
                                  src={application.image}
                                  className="h-10 w-10"
                                  alt="sitter_image"
                                /></td>
                                <td>     <button
                                type="button"
                                onClick={() =>
                                  showConfirmationDialog(application.id)
                                }
                                className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                              >
                                <img className="h-6 w-6" src={ignore} alt="" />
                              </button></td>
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
