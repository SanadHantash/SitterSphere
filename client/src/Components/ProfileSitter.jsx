import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useCookies } from "react-cookie";
import { useParams, Link } from "react-router-dom";
import cooking from "../Assets/cooking.svg";
import firstaid from "../Assets/firstaid.svg";
import nonsmoker from "../Assets/nonsmoker.svg";
import draw from "../Assets/draw.svg";
import car from "../Assets/car.svg";
import driver from "../Assets/drive.svg";
import music from "../Assets/music.svg";
import reading from "../Assets/reading.svg";
import months from "../Assets/0-12months.svg";
import years1_2 from "../Assets/1-2years.svg";
import years2_3 from "../Assets/1-2years.svg";
import years3_5 from "../Assets/2-3years.svg";
import years5 from "../Assets/5+years.svg";
import SitterApplication from "./SitterApplication";

function ProfileSitter() {
  const [sitters, setSitters] = useState([]);
  const [cookies] = useCookies(["token"]);
  const token = cookies.Token;

  const [createInfo, setCreateInfo] = useState(
      {
      experience_level: 1,
      months_0_12: false,
      years_1_2: false,
      years_2_3: false,
      years_3_5: false,
      years_5: false,
      can_drive: false,
      non_smoker: false,
      cooking: false,
      draw: false,
      has_car: false,
      first_aid: false,
      reading: false,
      music: false,
      description:"",
      salary:""
    }
  );


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreateInfo({ ...createInfo, [name]: value });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCreateInfo({ ...createInfo, [name]: checked });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const atLeastOneChecked =
      createInfo.months_0_12 ||
      createInfo.years_1_2 ||
      createInfo.years_2_3 ||
      createInfo.years_3_5 ||
      createInfo.years_5;

    if (!atLeastOneChecked) {
      Swal.fire({
        icon: "error",
        title: "Please select at least one age range.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    const atLeastOneRequirementChecked =
      createInfo.can_drive ||
      createInfo.non_smoker ||
      createInfo.cooking ||
      createInfo.draw ||
      createInfo.first_aid ||
      createInfo.has_car ||
      createInfo.reading ||
      createInfo.music;

    if (!atLeastOneRequirementChecked) {
      Swal.fire({
        icon: "error",
        title: "Please select at least one skill requirement.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    try {
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.post(
        `http://localhost:8080/sitters/addmydetail`,
        createInfo
      );

      setCreateInfo(response.data);
     

      console.log("Response data:", response.data);

      Swal.fire({
        icon: "success",
        title: "Your Informations added successfully!",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {

      if (error.response) {
        const errorMessage = error.response.data.error;

        if (errorMessage === "you  already added your Info") {
          Swal.fire({
            icon: "info",
            title: "Added Info",
            text: errorMessage
          });
        }
      } else {
        Swal.fire({
          icon: "success",
          title: "Your Informations added successfully!",
          showConfirmButton: false,
          timer: 1500
        });
       
      }
    }
  };




  useEffect(() => {
    const fetchUsersitters = async () => {
      try {
        if (!token) {
          console.error("Token not available.");
          return;
        }

        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(
          `http://localhost:8080/sitters/mydetails`
        );

        setSitters(response.data.mydetail);
        console.log(response.data.mydetail[0]);
      } catch (error) {
        console.error("Error fetching user sitters[0]s:", error);
      }
    };

    fetchUsersitters();
  }, []);


  if (!Array.isArray(sitters) || sitters.length === 0) {
    return (
      <>
      <main className="w-full min-h-screen md:w-2/3 lg:w-3/4">
        <div className="p-2 md:p-4">
          <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
            <h2 className="pl-6 text-2xl font-bold sm:text-xl">Add request</h2>
            <div className="grid max-w-2xl mx-auto mt-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col gap-y-2">
                  <label className="font-bold">Experince</label>
                  <input
                    type="number"
                    name="experience_level"
                    value={createInfo.experience_level}
                    onChange={handleInputChange}
                    className="border rounded-md px-2 py-1 mb-2 w-full"
                    min="1"
                    required
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <label className="font-bold">Description</label>
                  <textarea
                    name="description"
                    value={createInfo.description}
                    onChange={handleInputChange}
                    maxLength={500}
                    className="border rounded-md px-2 py-1 mb-2 w-full"
                    rows={4}
                    required
                  />
                 <p className="text-sm text-gray-500">{`${(createInfo.description || '').length}/500 characters`}</p>
                </div>
                <div className="flex flex-col gap-y-2">
                  <label className="font-bold">Monthly Salary</label>
                  <input
                    type="number"
                    name="salary"
                    value={createInfo.salary}
                    onChange={handleInputChange}
                    className="border rounded-md px-2 py-1 mb-2 w-full"
                    min="150"
                    required
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
                      checked={createInfo.months_0_12}
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
                      checked={createInfo.years_1_2}
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
                      checked={createInfo.years_2_3}
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
                      checked={createInfo.years_3_5}
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
                      checked={createInfo.years_5}
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
                        checked={createInfo.can_drive}
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
                        checked={createInfo.non_smoker}
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
                        checked={createInfo.cooking}
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
                        checked={createInfo.draw}
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
                        checked={createInfo.first_aid}
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
                        checked={createInfo.has_car}
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
                        checked={createInfo.reading}
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
                        checked={createInfo.music}
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

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#FF90BC] text-white px-4 py-2 rounded-md mr-2 hover:bg-[#FFC0D9]"
                  >
                    submit
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

  return (
    <>
    
      <div class="bg-white  max-w-2xl shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 mt-5 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">my info</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Details and informations about me.
          </p>
        </div>
        <div class="border-t border-gray-200">
          <dl>
            {Array.isArray(sitters) && sitters.length > 0 && (
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                  Experience level
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {sitters[0].experience_level}
                </dd>
              </div>
            )}
              {Array.isArray(sitters) && sitters.length > 0 && (
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                  Rate
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {sitters[0].rate}
                </dd>
              </div>
            )}
             {Array.isArray(sitters) && sitters.length > 0 && (
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                  Description
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {sitters[0].description}
                </dd>
              </div>
            )}
             {Array.isArray(sitters) && sitters.length > 0 && (
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                 Monthly Salary
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {sitters[0].salary}$
                </dd>
              </div>
            )}
              {Array.isArray(sitters) && sitters.length > 0 && (
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                  Skills
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {sitters[0].cooking && (
                        <img
                          src={cooking}
                          alt="Cooking Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}

                      {sitters[0].draw && (
                        <img
                          src={draw}
                          alt="draw platte Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}

                      {sitters[0].can_drive && (
                        <img
                          src={driver}
                          alt="driver license Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}

                      {sitters[0].first_aid && (
                        <img
                          src={firstaid}
                          alt="firstaid Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}
                      {sitters[0].non_smoker && (
                        <img
                          src={nonsmoker}
                          alt="nonsmoker Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}
                      {sitters[0].has_car && (
                        <img
                          src={car}
                          alt="car Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}
                      {sitters[0].reading && (
                        <img
                          src={reading}
                          alt="reading Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}
                      {sitters[0].music && (
                        <img
                          src={music}
                          alt="music Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}
                </dd>
              </div>
            )}
              {Array.isArray(sitters) && sitters.length > 0 && (
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                  Ages
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {sitters[0].months_0_12 && (
                        <img
                          src={months}
                          alt="0-12 months Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}

                      {sitters[0].years_1_2 && (
                        <img
                          src={years1_2}
                          alt="1-2 years Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}

                      {sitters[0].years_2_3 && (
                        <img
                          src={years2_3}
                          alt="2-3 years Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}

                      {sitters[0].years_3_5 && (
                        <img
                          src={years3_5}
                          alt="3-5 years Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}
                      {sitters[0].years_5 && (
                        <img
                          src={years5}
                          alt="+5 years Icon"
                          className="w-8 h-8 inline-block mr-2"
                        />
                      )}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      <SitterApplication />
    </>
  );
}

export default ProfileSitter;
