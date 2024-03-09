import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../Context/AuthContext";
import { useCookies } from "react-cookie";

function CreateSitter({ closeModal, addedSitter }) {
  const [createSitter, setCreatedSitter] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    phonenumber: "",
    image: null,
  });

  const { headers } = useAuth();
  const [cookies] = useCookies(["token"]);
  const token = cookies.Token;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreatedSitter({ ...createSitter, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCreatedSitter((prevData) => ({ ...prevData, image: file }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("first_name", createSitter.first_name);
      form.append("last_name", createSitter.last_name);
      form.append("user_name", createSitter.user_name);
      form.append("email", createSitter.email);
      form.append("phonenumber", createSitter.phonenumber);
      form.append("image", createSitter.image);

      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.post(
        "http://localhost:8080/dashboard/addbabysitter",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      addedSitter(response.data);
      console.log(response.data);

      Swal.fire({
        icon: "success",
        title: "Sitter Added Successfully!",
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
      <form onSubmit={handleUpdate}>
        <div className="bg-white rounded-lg w-full sm:w-96 shadow-lg p-6 max-h-[80vh] overflow-y-auto  scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-indigo-950 scrollbar-track-indigo-100">
          <h2 className="text-xl font-semibold mb-4"> Add Sitter</h2>

          <div className="flex flex-col gap-y-2">
            <label className="font-bold">First Name</label>
            <input
              type="text"
              name="first_name"
              value={createSitter.first_name}
              onChange={handleInputChange}
              className="border rounded-md px-2 py-1 mb-2 w-full"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="font-bold">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={createSitter.last_name}
              onChange={handleInputChange}
              className="border rounded-md px-2 py-1 mb-2 w-full"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="font-bold">User Name</label>
            <input
              type="text"
              name="user_name"
              value={createSitter.user_name}
              onChange={handleInputChange}
              className="border rounded-md px-2 py-1 mb-2 w-full"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="font-bold">email</label>
            <input
              type="text"
              name="email"
              value={createSitter.email}
              onChange={handleInputChange}
              className="border rounded-md px-2 py-1 mb-2 w-full"
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="font-bold">Phonenumber</label>
            <input
              type="text"
              name="phonenumber"
              value={createSitter.phonenumber}
              onChange={handleInputChange}
              className="border rounded-md px-2 py-1 mb-2 w-full"
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="font-bold">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="border rounded-md px-2 py-1 mb-2 w-full"
            />
          </div>

      
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#FF90BC] text-white px-4 py-2 rounded-md mr-2 hover:bg-[#FFC0D9]"
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
      </form>
    </div>
  );
}

export default CreateSitter;
