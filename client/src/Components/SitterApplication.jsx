import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import ignore from "../Assets/ignore.svg";
import accept from "../Assets/accept.png";
import months from "../Assets/0-12months.svg";
import years1_2 from "../Assets/1-2years.svg";
import years2_3 from "../Assets/1-2years.svg";
import years3_5 from "../Assets/2-3years.svg";
import years5 from "../Assets/5+years.svg";

function SitterApplication() {

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cookies] = useCookies(["token"]);
    const token = cookies.Token;

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
          await axios.post(
            `http://localhost:8080/profile/sittapplication/${applicationId}/accept`
          );
          setApplications(
            applications.filter((application) => application.id !== applicationId)
          );
        } catch (error) {
          console.error(`Error deleting sitter ${applicationId}:`, error);
        }
      };
    
      const ignoreApplication = async (applicationId) => {
        try {
          axios.defaults.headers.common["Authorization"] = token;
          await axios.put(
            `http://localhost:8080/profile/sittapplication/${applicationId}/ignore`
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
              `http://localhost:8080/profile/mysittapplications`
            );
            setApplications(response.data.applications);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching applications:", error);
            setLoading(false);
          }
        };
    
        fetchApplications();
      }, []);
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
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3  text-xs font-medium text-gray-500 uppercase"
              >
                Childern Count
              </th>
              <th
                scope="col"
                className="px-6 py-3  text-xs font-medium text-gray-500 uppercase"
              >
                Start Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
              >
                Image
              </th>
              <th
                scope="col"
                className="px-6 py-3  text-xs font-medium text-gray-500 uppercase"
              >
                Period
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase"
              >
                Salary
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase"
              >
                Ages
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
                <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">{application.childern_count}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">{application.start_time}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">
                  <img
                    src={application.image}
                    className="h-10 w-10"
                    alt="sitter_image"
                  />
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">{application.period}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">{application.salary}$/monthly</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">

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
  )
}

export default SitterApplication