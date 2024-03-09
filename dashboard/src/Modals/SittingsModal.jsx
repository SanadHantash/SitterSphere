import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from "react-cookie";

function SittingsModal({ sitter, closeModal }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(["token"]);
  const token = cookies.Token;

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(`http://localhost:8080/dashboard/sitter/${sitter.id}/sittingtimes`);
        setApplications(response.data.applications);
       setLoading(false);
      } catch (error) {
        console.error("Error fetching applications:", error);
        setLoading(false);
      }
    };

    fetchApplications();
  }, [sitter]);

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
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">User Name</th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Phone Number</th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Childerns Count</th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Site</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {applications.map((application) => (
                  <tr key={application.id}>
                    <td className="px-6 py-4">{application.user_name}</td>
                    <td className="px-6 py-4">{application.phonenumber}</td>
                    <td className="px-6 py-4">{application.childern_count}</td>
                    <td className="px-6 py-4">{application.site}</td>
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

export default SittingsModal;
