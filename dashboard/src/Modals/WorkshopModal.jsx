import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useAuth } from "../Context/AuthContext";

import { useCookies } from "react-cookie";

function WorkshopModal({ workshop, closeModal, updateWorkshop }) {
  const [cookies] = useCookies(["token"]);
  const [updatedWorkshop, setUpdatedWorkshop] = useState(
    workshop || {
      title: "",
      detail: "",
      description: "",
      trainer: "",
      category_id: 0,
      is_paid: false,
      image: null,
      site: "",
      start_time: "",
      end_time: "",
    }
  );
  const token = cookies.Token;
  const { headers } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedWorkshop({ ...updatedWorkshop, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.put(
        `http://localhost:8080/dashboard/updatecourse/${workshop.id}`,
        updatedWorkshop
      );

      updateWorkshop(response.data.course);

      
      Swal.fire({
        icon: "success",
        title: "Workshop Updated Successfully!",
        showConfirmButton: false,
        timer: 1500, 
      });
  
      closeModal(); 
    } catch (error) {
   
      console.error("Error submitting FAQ:", error);
  
      
      Swal.fire({
        icon: "error",
        title: "Oops... Something went wrong!",
        text: "Please try again.",
      });
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur backdrop-filter   bg-black bg-opacity-30">
      <div className="bg-white rounded-lg w-full sm:w-96 shadow-lg p-6 max-h-[80vh] overflow-y-auto  scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-indigo-950 scrollbar-track-indigo-100">
        <h2 className="text-xl font-semibold mb-4"> Edit Workshop</h2>

        <div className="flex flex-col gap-y-2">
          <label className="font-bold">Title</label>
          <input
            type="text"
            name="title"
            value={updatedWorkshop.title}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="font-bold">Detail</label>
          <input
            type="text"
            name="detail"
            value={updatedWorkshop.detail}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="font-bold">Description</label>
          <input
            type="text"
            name="description"
            value={updatedWorkshop.description}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="font-bold">Trainer</label>
          <input
            type="text"
            name="trainer"
            value={updatedWorkshop.trainer}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <label className="font-bold">Start Time</label>
          <input
            type="datetime-local"
            name="start_time"
            value={updatedWorkshop.start_time}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="font-bold">End Time</label>
          <input
            type="datetime-local"
            name="end_time"
            value={updatedWorkshop.end_time}
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

export default WorkshopModal;
