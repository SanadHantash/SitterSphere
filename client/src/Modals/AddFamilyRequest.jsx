import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useCookies } from "react-cookie";
import months from "../Assets/0-12months.svg";
import years1_2 from "../Assets/1-2years.svg";
import years2_3 from "../Assets/1-2years.svg";
import years3_5 from "../Assets/2-3years.svg";
import years5 from "../Assets/5+years.svg";
import cooking from "../Assets/cooking.svg";
import firstaid from "../Assets/firstaid.svg";
import nonsmoker from "../Assets/nonsmoker.svg";
import draw from "../Assets/draw.svg";
import car from "../Assets/car.svg";
import driver from "../Assets/drive.svg";
import music from "../Assets/music.svg";
import reading from "../Assets/reading.svg";

function AddFamilyRequest({ addrequest, closeModal, addedRequest }) {
  const [formData, setFormData] = useState(
    addrequest || {
      title: "",
      description: "",
      childern_count: 1,
      months_0_12: false,
      years_1_2: false,
      years_2_3: false,
      years_3_5: false,
      years_5: false,
      can_drive: false,
      non_smoker: false,
      cooking: false,
      draw: false,
      first_aid: false,
      has_car: false,
      reading: false,
      music: false,
      time: "",
      pay: "",
      image: null,
    }
  );

  const [cookies] = useCookies(["token"]);
  const token = cookies.Token;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, image: file }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("childern_count", formData.childern_count);
      form.append("months_0_12", formData.months_0_12);
      form.append("years_1_2", formData.years_1_2);
      form.append("years_2_3", formData.years_2_3);
      form.append("years_3_5", formData.years_3_5);
      form.append("years_5", formData.years_5);
      form.append("can_drive", formData.can_drive);
      form.append("non_smoker", formData.non_smoker);
      form.append("cooking", formData.cooking);
      form.append("draw", formData.draw);
      form.append("first_aid", formData.first_aid);
      form.append("has_car", formData.has_car);
      form.append("reading", formData.reading);
      form.append("music", formData.music);
      form.append("time", formData.time);
      form.append("pay", formData.pay);
      form.append("image", formData.image);

      const atLeastOneAgeChecked =
        formData.months_0_12 ||
        formData.years_1_2 ||
        formData.years_2_3 ||
        formData.years_3_5 ||
        formData.years_5;

      if (!atLeastOneAgeChecked) {
        Swal.fire({
          icon: "error",
          title: "Please select at least one age range.",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
      const atLeastOneRequirementChecked =
        formData.can_drive ||
        formData.non_smoker ||
        formData.cooking ||
        formData.draw ||
        formData.first_aid ||
        formData.has_car ||
        formData.reading ||
        formData.music;

      if (!atLeastOneRequirementChecked) {
        Swal.fire({
          icon: "error",
          title: "Please select at least one skill requirement.",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }

      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.post(
        "http://localhost:8080/family/addrequest",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await addedRequest(formData);
      closeModal();
      Swal.fire({
        icon: "success",
        title: "Request Submitted!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Application Failed",
        text: "An error occurred during enrollment. Please try again later.",
      });
    }
  };

  return (
    <>
      <main className="w-full min-h-screen md:w-2/3 lg:w-3/4">
        <div className="p-2 md:p-4">
          <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
            <h2 className="pl-6 text-2xl font-bold sm:text-xl">Add request</h2>
            <div className="grid max-w-2xl mx-auto mt-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col gap-y-2">
                  <label className="font-bold">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="border rounded-md px-2 py-1 mb-2 w-full"
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <label className="font-bold">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    maxLength={500}
                    className="border rounded-md px-2 py-1 mb-2 w-full"
                    rows={4}
                  />
                  <p className="text-sm text-gray-500">{`${formData.description.length}/500 characters`}</p>
                </div>
                <div className="flex flex-col gap-y-2">
                  <label className="font-bold">Counts of children</label>
                  <input
                    type="number"
                    name="childern_count"
                    value={formData.childern_count}
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
                      checked={formData.months_0_12}
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
                      checked={formData.years_1_2}
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
                      checked={formData.years_2_3}
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
                      checked={formData.years_3_5}
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
                      checked={formData.years_5}
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
                <div className="flex flex-col items-center">
                  <label className="font-bold">Skills Requiremnts</label>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="can_drive"
                        value="true"
                        onChange={handleCheckboxChange}
                        checked={formData.can_drive}
                        className="form-checkbox h-5 w-5 text-[#FF90BC] border-[#FF90BC] rounded mr-2"
                      />
                      <img
                        src={driver}
                        alt="driver Icon"
                        className="w-12 h-12 inline-block mr-2"
                      />
                      <span className="title-font font-medium text-xl text-[#FF90BC]">
                        can drive
                      </span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="non_smoker"
                        value="true"
                        onChange={handleCheckboxChange}
                        checked={formData.non_smoker}
                        className="form-checkbox h-5 w-5 text-[#FF90BC] border-[#FF90BC] rounded mr-2"
                      />
                      <img
                        src={nonsmoker}
                        alt="cooking Icon"
                        className="w-12 h-12 inline-block mr-2"
                      />
                      <span className="title-font font-medium text-xl text-[#FF90BC]">
                        non Smoker
                      </span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="cooking"
                        value="true"
                        onChange={handleCheckboxChange}
                        checked={formData.cooking}
                        className="form-checkbox h-5 w-5 text-[#FF90BC] border-[#FF90BC] rounded mr-2"
                      />
                      <img
                        src={cooking}
                        alt="Cooking Icon"
                        className="w-12 h-12 inline-block mr-2"
                      />
                      <span className="title-font font-medium text-xl text-[#FF90BC]">
                        Cooking
                      </span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="draw"
                        value="true"
                        onChange={handleCheckboxChange}
                        checked={formData.draw}
                        className="form-checkbox h-5 w-5 text-[#FF90BC] border-[#FF90BC] rounded mr-2"
                      />
                      <img
                        src={draw}
                        alt="draw Icon"
                        className="w-12 h-12 inline-block mr-2"
                      />
                      <span className="title-font font-medium text-xl text-[#FF90BC]">
                        Draw
                      </span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="first_aid"
                        value="true"
                        onChange={handleCheckboxChange}
                        checked={formData.first_aid}
                        className="form-checkbox h-5 w-5 text-[#FF90BC] border-[#FF90BC] rounded mr-2"
                      />
                      <img
                        src={firstaid}
                        alt="+5 years Icon"
                        className="w-12 h-12 inline-block mr-2"
                      />
                      <span className="title-font font-medium text-xl text-[#FF90BC]">
                        First Aid
                      </span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="has_car"
                        value="true"
                        onChange={handleCheckboxChange}
                        checked={formData.has_car}
                        className="form-checkbox h-5 w-5 text-[#FF90BC] border-[#FF90BC] rounded mr-2"
                      />
                      <img
                        src={car}
                        alt="car years Icon"
                        className="w-12 h-12 inline-block mr-2"
                      />
                      <span className="title-font font-medium text-xl text-[#FF90BC]">
                        Has a Car
                      </span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="reading"
                        value="true"
                        onChange={handleCheckboxChange}
                        checked={formData.reading}
                        className="form-checkbox h-5 w-5 text-[#FF90BC] border-[#FF90BC] rounded mr-2"
                      />
                      <img
                        src={reading}
                        alt="reading years Icon"
                        className="w-12 h-12 inline-block mr-2"
                      />
                      <span className="title-font font-medium text-xl text-[#FF90BC]">
                        Reading Stories
                      </span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="music"
                        value="true"
                        onChange={handleCheckboxChange}
                        checked={formData.music}
                        className="form-checkbox h-5 w-5 text-[#FF90BC] border-[#FF90BC] rounded mr-2"
                      />
                      <img
                        src={music}
                        alt="music years Icon"
                        className="w-12 h-12 inline-block mr-2"
                      />
                      <span className="title-font font-medium text-xl text-[#FF90BC]">
                        Music
                      </span>
                    </label>
                  </div>
                </div>
                <div className="flex flex-col gap-y-2">
                  <label className="font-bold">Pay</label>
                  <input
                    type="number"
                    name="pay"
                    value={formData.pay}
                    onChange={handleInputChange}
                    className="border rounded-md px-2 py-1 mb-2 w-full"
                    placeholder="how much would you pay"
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <label className="font-bold">Date</label>
                  <input
                    type="datetime-local"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="border rounded-md px-2 py-1 mb-2 w-full"
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    className="border rounded-md px-2 py-1 mb-2 w-full"
                    required=""
                  />
                </div>
                {formData.image && (
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="Selected Image"
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                  />
                )}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#FF90BC] text-white px-4 py-2 rounded-md mr-2 hover:bg-[#FFC0D9]"
                  >
                    ADD Request
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default AddFamilyRequest;
