import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../Context/AuthContext";
import { useCookies } from "react-cookie";
function AttendancesModal({ course, closeModal }) {
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(true);
  const { headers } = useAuth();
  const [cookies] = useCookies(["token"]);
  const token = cookies.Token;
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching attendances...");
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(`http://localhost:8080/dashboard/course/${course.id}/attendances`);
        setAttendances(response.data.attendances);
        console.log("Attendances data:", response.data.attendances);
      } catch (error) {
        console.error("Error fetching attendances:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [course]);

  return (
    <>
      <div>
        <h2>Attendances</h2>
        {loading ? (
          <p>Loading attendances...</p>
        ) : (
          <>
            {attendances.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">User Name</th>
                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Phone Number</th>
                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {attendances.map((attendee) => (
                    <tr key={attendee.id}>
                      <td className="px-6 py-4">{attendee.user_name}</td>
                      <td className="px-6 py-4">{attendee.email}</td>
                      <td className="px-6 py-4">{attendee.phonenumber}</td>
                      <td className="px-6 py-4">{attendee.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No attendances available</p>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default AttendancesModal;
