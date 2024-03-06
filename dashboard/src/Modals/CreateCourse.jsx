import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';
import { useAuth } from "../Context/AuthContext";
import { useCookies } from "react-cookie";
function CreateCourse({ addcourse, closeModal, addedCourse }) {
  const [createCourse, setCreatedCourse] = useState(
    addcourse || {
      title: "",
      detail: "",
      description: "",
      trainer: "",
      category_id: 0,
      is_paid: false,
      image: null,
      site: "",
      seats: 0,
      start_time: "",
      end_time: "",
    }
  );
  const [image, setImage] = useState(null);
  const { headers } = useAuth();
  const [cookies] = useCookies(["token"]);
  const token = cookies.Token;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreatedCourse({ ...createCourse, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // setImage(file);
    setCreatedCourse((prevData) => ({ ...prevData, image: file }));
  };

 
  const handleUpdate = async () => {
   
    try {
      const form = new FormData();
      form.append("title", createCourse.title);
      form.append("detail", createCourse.detail);
      form.append("description", createCourse.description);
      form.append("trainer", createCourse.trainer);
      form.append("category_id", createCourse.category_id);
      form.append("is_paid", createCourse.is_paid);
      form.append("site", createCourse.site);
      form.append("seats", createCourse.seats);
      form.append("start_time", createCourse.start_time);
      form.append("end_time", createCourse.end_time);
      form.append("image", createCourse.image);
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

      addedCourse(response.data);

      
      Swal.fire({
        icon: "success",
        title: "Course Created Successfully!",
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
          <h2 className="text-xl font-semibold mb-4"> Edit Course</h2>

          <div className="flex flex-col gap-y-2">
            <label className="font-bold">Title</label>
            <input
              type="text"
              name="title"
              value={createCourse.title}
              onChange={handleInputChange}
              className="border rounded-md px-2 py-1 mb-2 w-full"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="font-bold">Detail</label>
            <input
              type="text"
              name="detail"
              value={createCourse.detail}
              onChange={handleInputChange}
              className="border rounded-md px-2 py-1 mb-2 w-full"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="font-bold">Description</label>
            <input
              type="text"
              name="description"
              value={createCourse.description}
              onChange={handleInputChange}
              className="border rounded-md px-2 py-1 mb-2 w-full"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="font-bold">Trainer</label>
            <input
              type="text"
              name="trainer"
              value={createCourse.trainer}
              onChange={handleInputChange}
              className="border rounded-md px-2 py-1 mb-2 w-full"
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="font-bold">Category</label>
            <select
              name="category_id"
              value={createCourse.category_id}
              onChange={handleInputChange}
              className="border rounded-md px-2 py-1 mb-2 w-full"
            >
              <option value={1}>Onsite</option>
              <option value={2}>Online</option>
            </select>
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="font-bold">Paid</label>
            <select
              name="is_paid"
              value={createCourse.is_paid}
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
              onChange={handleImageChange}
              className="border rounded-md px-2 py-1 mb-2 w-full"
            />
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="Selected"
                className="mt-2 rounded-md"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            )}
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="font-bold">Address</label>
            <input
              type="text"
              name="site"
              value={createCourse.site}
              onChange={handleInputChange}
              className="border rounded-md px-2 py-1 mb-2 w-full"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="font-bold">Seats</label>
            <input
              type="number"
              name="seats"
              value={createCourse.seats}
              onChange={handleInputChange}
              className="border rounded-md px-2 py-1 mb-2 w-full"
              min="0"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="font-bold">Start Time</label>
            <input
              type="date"
              name="start_time"
              value={createCourse.start_time}
              onChange={handleInputChange}
              className="border rounded-md px-2 py-1 mb-2 w-full"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="font-bold">End Time</label>
            <input
              type="date"
              name="end_time"
              value={createCourse.end_time}
              onChange={handleInputChange}
              className="border rounded-md px-2 py-1 mb-2 w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
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
      </form>
    </div>
  );
}

export default CreateCourse;
