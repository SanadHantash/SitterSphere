import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/logo3.png"
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import background from "../Assets/background.avif";

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/dashboard/login",
        formData
      );
      const { token } = response.data || {};
      if (token) {
        Cookies.set("Token", token);
        login(token);
        console.log("Login successful", response.data);
        navigate("/home");
      } else {
        console.error("Token not found in response");
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in", error);

      if (error.response && error.response.status === 401) {
        alert("Invalid credentials. Please check your email and password.");
      } else {
        alert("An error occurred while logging in. Please try again later.");
      }
    }
  };

  return (
    <>
     <div
        class="font-[sans-serif] text-indigo-950"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
        }}
      >
        <div class="min-h-screen flex fle-col items-center justify-center py-6 px-4">
          <div class="grid md:grid-cols-2 items-center gap-4 max-w-7xl w-full">
            <div class="border border-gray-300 rounded-md p-6 max-w-md shadow-[0_2px_22px_-4px_rgb(64, 69, 122)] max-md:mx-auto">
              <form class="space-y-6" onSubmit={handleLogin}>
                <div class="mb-10">
                  <h3 class="text-3xl font-extrabold">Sign in</h3>
                  <p class="text-sm mt-4">
                    Sign in to your account and explore a world of
                    possibilities. Your journey begins here.
                  </p>
                </div>
                <div>
                  <label class="text-sm mb-2 block">User name</label>
                  <div class="relative flex items-center">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      class="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-indigo-950"
                      placeholder="Enter user name"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      class="w-[18px] h-[18px] absolute right-4"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="10"
                        cy="7"
                        r="6"
                        data-original="#000000"
                      ></circle>
                      <path
                        d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <label class="text-sm mb-2 block">Password</label>
                  <div class="relative flex items-center">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      class="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[rgb(64, 69, 122)]"
                      placeholder="Enter password"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      class="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                      viewBox="0 0 128 128"
                    >
                      <path
                        d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div class="flex items-center justify-between gap-2"></div>
                <div class="!mt-10">
                  <button
                    type="submit"
                    class="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-[#FF90BC] hover:bg-[#FFC0D9] "
                  >
                    Log in
                  </button>
                </div>
              </form>
            </div>
            {/* <div class="lg:h-[400px] md:h-[300px] max-md:mt-10">
              <img
                src="https://readymadeui.com/login-image.webp"
                class="w-full h-full object-cover"
                alt="Dining Experience"
              />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
