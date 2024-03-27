import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useAuth } from "../Context/AuthContext";
import { useCookies } from "react-cookie";
import months from "../Assets/0-12months.svg";
import years1_2 from "../Assets/1-2years.svg";
import years2_3 from "../Assets/1-2years.svg";
import years3_5 from "../Assets/2-3years.svg";
import years5 from "../Assets/5+years.svg";

function SitterApplyModal({ addpplication, closeModal, addedApplication }) {
  const [createApplication, setCreateApplication] = useState(
    addpplication || {
      childern_count: 1,
      months_0_12: false,
      years_1_2: false,
      years_2_3: false,
      years_3_5: false,
      years_5: false,
      start_time: "",

      period:"3months",
      salary:200
    }
  );
  const { id } = useParams();
  const { headers } = useAuth();
  const [cookies] = useCookies(["token"]);
  const token = cookies.Token;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreateApplication({ ...createApplication, [name]: value });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCreateApplication({ ...createApplication, [name]: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setCreateApplication((prevApplication) => ({
      ...prevApplication,
      period: "3months",
    }));
    const atLeastOneChecked =
      createApplication.months_0_12 ||
      createApplication.years_1_2 ||
      createApplication.years_2_3 ||
      createApplication.years_3_5 ||
      createApplication.years_5;
  
    if (!atLeastOneChecked) {
      Swal.fire({
        icon: "error",
        title: "Please select at least one age range.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
  
    try {
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.post(
        `http://localhost:8080/sitter/${id}/apply`,
        createApplication
      );
  
      console.log("Response data:", response.data); 
  
      await addedApplication(createApplication);
      closeModal();
  
      Swal.fire({
        icon: "success",
        title: "Application Submitted!",
        showConfirmButton: false,
        timer: 1500,
      });
    }catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.error;
  
        if (errorMessage === "you are already applied for this babysitter") {
          Swal.fire({
            icon: "info",
            title: "Application Info",
            text: errorMessage,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Application Failed",
            text: `Server error: ${errorMessage}`,
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Application Failed",
          text: "An error occurred during enrollment. Please try again later.",
        });
      }
    }
  };
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur backdrop-filter bg-black bg-opacity-30">
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg w-full sm:w-96 shadow-lg p-6 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-indigo-950 scrollbar-track-indigo-100">
          <h2 className="text-xl font-semibold mb-4">
            Apply for this BabySitter
          </h2>
          <div className="flex flex-col gap-y-2">
            <label className="font-bold">Counts of children</label>
            <input
              type="number"
              name="childern_count"
              value={createApplication.childern_count}
              onChange={handleInputChange}
              className="border rounded-md px-2 py-1 mb-2 w-full"
              min="1"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="font-bold">Ages of childern</label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="months_0_12"
                value="true"
                onChange={handleCheckboxChange}
                checked={createApplication.months_0_12}
                className="form-checkbox h-5 w-5 text-[#FF90BC] border-[#FF90BC] rounded mr-2"
              />
              <img
                src={months}
                alt="months Icon"
                className="w-12 h-12 inline-block mr-2"
              />
              <span className="title-font font-medium text-xl text-[#FF90BC]">
                0-12 months
              </span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="years_1_2"
                value="true"
                onChange={handleCheckboxChange}
                checked={createApplication.years_1_2}
                className="form-checkbox h-5 w-5 text-[#FF90BC] border-[#FF90BC] rounded mr-2"
              />
              <img
                src={years1_2}
                alt="1-2 years Icon"
                className="w-12 h-12 inline-block mr-2"
              />
              <span className="title-font font-medium text-xl text-[#FF90BC]">
                1-2 years
              </span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="years_2_3"
                value="true"
                onChange={handleCheckboxChange}
                checked={createApplication.years_2_3}
                className="form-checkbox h-5 w-5 text-[#FF90BC] border-[#FF90BC] rounded mr-2"
              />
              <img
                src={years2_3}
                alt="2-3 years Icon"
                className="w-12 h-12 inline-block mr-2"
              />
              <span className="title-font font-medium text-xl text-[#FF90BC]">
                2-3 years
              </span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="years_3_5"
                value="true"
                onChange={handleCheckboxChange}
                checked={createApplication.years_3_5}
                className="form-checkbox h-5 w-5 text-[#FF90BC] border-[#FF90BC] rounded mr-2"
              />
              <img
                src={years3_5}
                alt="3-5years Icon"
                className="w-12 h-12 inline-block mr-2"
              />
              <span className="title-font font-medium text-xl text-[#FF90BC]">
                3-5 years
              </span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="years_5"
                value="true"
                onChange={handleCheckboxChange}
                checked={createApplication.years_5}
                className="form-checkbox h-5 w-5 text-[#FF90BC] border-[#FF90BC] rounded mr-2"
              />
              <img
                src={years5}
                alt="+5 years Icon"
                className="w-12 h-12 inline-block mr-2"
              />
              <span className="title-font font-medium text-xl text-[#FF90BC]">
                +5 years
              </span>
            </label>
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="font-bold">Address</label>
            <input
              type="text"
              name="site"
              value={createApplication.site}
              onChange={handleInputChange}
              className="border rounded-md px-2 py-1 mb-2 w-full"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="font-bold">Start Time</label>
            <input
              type="date"
              name="start_time"
              value={createApplication.start_time}
              onChange={handleInputChange}
              className="border rounded-md px-2 py-1 mb-2 w-full"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="font-bold">Period</label>
            <select
              name="period"
              value={createApplication.period}
              onChange={handleInputChange}
              className="border rounded-md px-2 py-1 mb-2 w-full"
            >
              <option value="3months">3 Months</option>
              <option value="6months">6 Months</option>
              <option value="9months">9 Months</option>
              <option value="1year">1 Years</option>
            </select>
          </div>
          <div className="flex flex-col gap-y-2">
                  <label className="font-bold">Salary per month</label>
                  <input
                    type="number"
                    name="salary"
                    value={createApplication.salary}
                    onChange={handleInputChange}
                    className="border rounded-md px-2 py-1 mb-2 w-full"
                    min={200}
                  />
                </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#FF90BC] text-white px-4 py-2 rounded-md mr-2 hover:bg-[#FFC0D9]"
            >
              Apply
            </button>
            <button
              type="button"
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

export default SitterApplyModal;
