import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useAuth } from "../Context/AuthContext";

import { useCookies } from "react-cookie";
function CreateTechtip({ addTechtip, closeModal, addedTechtip }) {
  const [createTechtip, setCreatedTechtip] = useState(addTechtip);
  const [image, setImage] = useState(null);
  const { headers } = useAuth();
  const [cookies] = useCookies(["token"]);
  const token = cookies.Token;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreatedTechtip({ ...createTechtip, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setCreatedTechtip((prevData) => ({ ...prevData, image: file }));
  };

  const handleUpdate = async () => {
    try {
      const form = new FormData();
      form.append("title", createTechtip.title);
      form.append("short_detail", createTechtip.title);
      form.append("detail", createTechtip.detail);
      form.append("image", createTechtip.image);
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.post(
        "http://localhost:8080/dashboard/createtichtip",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      addedTechtip(response.data);
   
      Swal.fire({
        icon: "success",
        title: "Techtip Created Successfully!",
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
        <h2 className="text-xl font-semibold mb-4"> Create Workshop</h2>

        <div className="flex flex-col gap-y-2">
          <label className="font-bold">Title</label>
          <input
            type="text"
            name="title"
            value={createTechtip.title}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="font-bold">shortDetail</label>
          <input
            type="text"
            name="short_detail"
            value={createTechtip.short_detail}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="font-bold">Detail</label>
          <textarea
            name="detail"
            value={createTechtip.detail}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <label className="font-bold">Image</label>
          <input
            type="file"
            name="image"
            // value={createWorkshop.image}
            onChange={handleImageChange}
            className="bor der rounded-md px-2 py-1 mb-2 w-full"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleUpdate}
            className="bg-indigo-950 text-white px-4 py-2 rounded-md mr-2 hover:bg-indigo-900"
          >
            Create
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

export default CreateTechtip;
