import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useAuth } from "../Context/AuthContext";

import { useCookies } from "react-cookie";
function TechtipModal({ techtip, closeModal, updateTechtip }) {
  const [updatedTechtip, setUpdatedTechtip] = useState(
    techtip || {
      title: "",
      short_detail: "",
      detail: "",
    }
  );

  const { headers } = useAuth();
  const [cookies] = useCookies(["token"]);
  const token = cookies.Token;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTechtip({ ...updatedTechtip, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      if (!techtip || !techtip.id) {
        console.error("Invalid techtip object:", techtip);
        return;
      }
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.put(
        `http://localhost:8080/dashboard/updatetechtip/${techtip.id}`,
        updatedTechtip
      );

      updateTechtip(response.data.techtip);
      await updateTechtip(response.data.techtip);
      closeModal();
    } catch (error) {
      console.error("Error updating Techtip:", error);
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
            value={updatedTechtip.title}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="font-bold">shortDetail</label>
          <input
            type="text"
            name="short_detail"
            value={updatedTechtip.short_detail}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="font-bold">Detail</label>
          <textarea
            name="detail"
            value={updatedTechtip.detail}
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

export default TechtipModal;
