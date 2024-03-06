import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useAuth } from "../Context/AuthContext";

import { useCookies } from "react-cookie";

function CreateWorkshop({ addWorkshop, closeModal, addedWorkshop }) {
  const [createWorkshop, setCreatedWorkshop] = useState(addWorkshop);
  const [image, setImage] = useState(null);
  const { headers } = useAuth();
  const [cookies] = useCookies(["token"]);
  const token = cookies.Token;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreatedWorkshop({ ...createWorkshop, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setCreatedWorkshop((prevData) => ({ ...prevData, image: file }));
  };

  const handleUpdate = async () => {
    try {
      const form = new FormData();
      form.append("title", createWorkshop.title);
      form.append("detail", createWorkshop.detail);
      form.append("description", createWorkshop.description);
      form.append("trainer", createWorkshop.trainer);
      form.append("category_id", createWorkshop.category_id);
      form.append("is_paid", createWorkshop.is_paid);
      form.append("site", createWorkshop.site);
      form.append("start_time", createWorkshop.start_time);
      form.append("end_time", createWorkshop.end_time);
      form.append("seats", createWorkshop.seats);
      form.append("image", createWorkshop.image); 

      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.post(
        "http://localhost:8080/dashboard/createcourse",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        }
      );

      addedWorkshop(response.data);
      Swal.fire({
        icon: "success",
        title: "Course Created Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      closeModal();
    } catch (error) {
      console.error("Error submitting Course:", error);

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
            value={createWorkshop.title}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="font-bold">Detail</label>
          <input
            type="text"
            name="detail"
            value={createWorkshop.detail}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="font-bold">Description</label>
          <input
            type="text"
            name="description"
            value={createWorkshop.description}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="font-bold">Trainer</label>
          <input
            type="text"
            name="trainer"
            value={createWorkshop.trainer}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
        </div>
        {/* <div className="flex flex-col gap-y-2">
        <label className="font-bold">category</label>
        <input
          type="number"
          name="category_id"
          value={createWorkshop.category_id}
          onChange={handleInputChange}
          className="border rounded-md px-2 py-1 mb-2 w-full"
        />
      </div> */}

        <div className="flex flex-col gap-y-2">
          <label className="font-bold">Category</label>
          <select
            name="category_id"
            value={createWorkshop.category_id}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          >
            <option value={3}>Onsite</option>
            <option value={4}>Online</option>
          </select>
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="font-bold">Paid</label>
          <select
            name="is_paid"
            value={createWorkshop.is_paid}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          >
            <option value="true">Paid</option>
            <option value="false">Free</option>
          </select>
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
        <div className="flex flex-col gap-y-2">
          <label className="font-bold">Address</label>
          <input
            type="text"
            name="site"
            value={createWorkshop.site}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="font-bold">Seats</label>
          <input
            type="number"
            name="seats"
            value={createWorkshop.seats}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
            min="0"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="font-bold">Start Time</label>
          <input
            type="datetime-local"
            name="start_time"
            value={createWorkshop.start_time}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="font-bold">End Time</label>
          <input
            type="datetime-local"
            name="end_time"
            value={createWorkshop.end_time}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
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

export default CreateWorkshop;
