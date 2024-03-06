import React, { useState } from "react";
import axios from "axios";

function UserModal({ user, closeModal, updateUser }) {
  const [updatedUser, setUpdatedUser] = useState({ ...user });



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleUpdate = () => {
 
    axios
      .put(`http://localhost:3000/users/${user.id}`, updatedUser)
      .then((response) => {
        updateUser(response.data);
        closeModal();
      })
      .catch((error) => {
        console.error("Error updating user: ", error);
      });
  };
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur backdrop-filter bg-black bg-opacity-30">
        {/* Modal Content */}
        <div className="bg-white rounded-lg  w-80 shadow-lg p-6">
          {/* Form fields for updating user information */}
          <input
            type="text"
            name="first_name"
            value={updatedUser.first_name}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
          <input
            type="text"
            name="last_name"
            value={updatedUser.last_name}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
          <input
            type="text"
            name="user_name"
            value={updatedUser.user_name}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
          <input
            type="text"
            name="email"
            value={updatedUser.email}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
          <input
            type="text"
            name="phonenumber"
            value={updatedUser.phonenumber}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />

          {/* Buttons */}
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
    </>
  );
}

export default UserModal;
