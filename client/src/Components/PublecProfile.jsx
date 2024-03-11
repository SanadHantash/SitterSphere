import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { useCookies } from "react-cookie";

function PublecProfile() {
  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    phonenumber: "",
    image: null,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [cookies] = useCookies(["token"]);
  const token = cookies.Token;
  const [fileInputRef, setFileInputRef] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!token) {
          console.error("Token not available.");
          return;
        }

        axios.defaults.headers.common["Authorization"] = token;

        const response = await axios.get("http://localhost:8080/profile");

        setUserInfo(response.data.info[0]);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error.response);
      }
    };

    fetchUserData();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUserInfo((prevData) => ({ ...prevData, image: file }));
  };

  const handleUpdate = async () => {
    try {
      if (!token) {
        console.error("Token not available.");
        return;
      }

      axios.defaults.headers.common["Authorization"] = token;

      const response = await axios.put(
        "http://localhost:8080/myprofile/updateinfo",
        userInfo
      );

      console.log("User data updated!", response.data);
    } catch (error) {
      console.error("Error updating user data:", error.response);
    }
  };

  const handleUpload = async () => {
    try {
      if (!token) {
        console.error("Token not available.");
        return;
      }

      const form = new FormData();
      form.append("image", selectedFile);

      axios.defaults.headers.common["Authorization"] = token;

      const response = await axios.put(
        "http://localhost:8080/profile/uploadimage",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("User data updated!", response.data);
    } catch (error) {
      console.error("Error updating user data:", error.response);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    setFileInputRef(document.getElementById("avatar"));
  }, []);

  return (
    <>
      <main className="w-full min-h-screen md:w-2/3 lg:w-3/4">
        <div className="p-2 md:p-4">
          <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
            <h2 className="pl-6 text-2xl font-bold sm:text-xl">
              Public Profile
            </h2>
            <div className="grid max-w-2xl mx-auto mt-8">
              <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                <div className="flex flex-row relative space-y-5 sm:ml-8">
                  <input
                    type="file"
                    id="avatar"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    ref={(input) => setFileInputRef(input)}
                  />
                  <label
                    htmlFor="avatar"
                    className="cursor-pointer group relative"
                  >
                    <img
                      src={
                        selectedFile
                          ? URL.createObjectURL(selectedFile)
                          : userInfo.image
                      }
                      alt="profile_image"
                      className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500 cursor-pointer hover:ring-4 hover:ring-indigo-400"
                      onClick={() => fileInputRef.click()}
                    />

                    <span className="hidden group-hover:flex absolute text-indigo-100 bg-[#202142] bg-opacity-60 rounded-full inset-0 items-center justify-center font-bold">
                      Upload Image
                    </span>
                  </label>

                  <button
                    style={{ height: "40px", width: "200px" }}
                    className=" absolute px-7 top-12 left-48 text-base font-medium text-white bg-[#FF90BC] rounded-lg border border-indigo-200 hover:bg-[#FFC0D9] focus:z-10 focus:ring-4 focus:ring-indigo-200 inline-block"
                    onClick={handleUpload}
                  >
                    Save Picture
                  </button>
                </div>
              </div>
              <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                  <div className="w-full">
                    <label
                      htmlFor="first_name"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Your first name
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={userInfo.first_name}
                      onChange={handleInputChange}
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                      placeholder="Your first name"
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="last_name"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Your last name
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={userInfo.last_name}
                      onChange={handleInputChange}
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="Your last name"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="user_name"
                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                  >
                    Your User name
                  </label>
                  <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    value={userInfo.user_name}
                    onChange={handleInputChange}
                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="Your last name"
                  />
                </div>
                <div className="mb-2 sm:mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleInputChange}
                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="your.email@mail.com"
                  />
                </div>
                <div className="mb-2 sm:mb-6">
                  <label
                    htmlFor="phonenumber"
                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phonenumber"
                    name="phonenumber"
                    value={userInfo.phonenumber}
                    onChange={handleInputChange}
                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="07911111111"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    onClick={handleUpdate}
                    className="text-white bg-[#FF90BC]  hover:bg-[#FFC0D9] focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default PublecProfile;
