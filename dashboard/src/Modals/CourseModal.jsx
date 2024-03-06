import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

import { useCookies } from "react-cookie";
function CourseModal({ course, closeModal, updateCourse }) {
  const [updatedCourse, setUpdatedCourse] = useState(course);
  const { headers } = useAuth();
  const [cookies] = useCookies(["token"]);
  const token = cookies.Token;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCourse({ ...updatedCourse, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      console.log("Updating course:", updatedCourse); // Log the updatedCourse before making the request
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.put(
        `http://localhost:8080/dashboard/updatecourse/${course.id}`,
        updatedCourse
      );

      updateCourse(response.data.course);

      closeModal();
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur backdrop-filter   bg-black bg-opacity-30">
      <div className="bg-white rounded-lg w-full sm:w-96 shadow-lg p-6 max-h-[80vh] overflow-y-auto  scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-indigo-950 scrollbar-track-indigo-100">
        <h2 className="text-xl font-semibold mb-4"> Edit Course</h2>
        {/* Input fields to edit course information */}
        <div className="flex flex-col gap-y-2">
          <label className="font-bold">Title</label>
          <input
            type="text"
            name="title"
            value={updatedCourse.title}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="font-bold">Detail</label>
          <input
            type="text"
            name="detail"
            value={updatedCourse.detail}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="font-bold">Description</label>
          <input
            type="text"
            name="description"
            value={updatedCourse.description}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="font-bold">Trainer</label>
          <input
            type="text"
            name="trainer"
            value={updatedCourse.trainer}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <label className="font-bold">Start Time</label>
          <input
            type="date"
            name="start_time"
            value={updatedCourse.start_time}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="font-bold">End Time</label>
          <input
            type="date"
            name="end_time"
            value={updatedCourse.end_time}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleUpdate}
            className="bg-indigo-950 text-white px-4 py-2 rounded-md mr-2 hover:bg-indigo-900"
          >
            Update
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseModal;
