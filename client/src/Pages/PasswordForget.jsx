import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import background from "../Assets/back.png";

function PasswordForget() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/forgetpassword",
        { email }
      );

      navigate("/verify-code");
    } catch (error) {}
  };
  return (
    <div
      class="max-w-full max-h-full mx-auto "
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
      }}
    >
      <div class="flex flex-col items-center justify-center mt-14 mb-20 p-4 space-y-4 antialiased text-gray-900 ">
        <div class="w-full px-8 max-w-lg space-y-6 bg-white rounded-md py-16">
          <h1 class=" mb-6 text-3xl font-bold text-center">Don't worry</h1>
          <p class="text-center mx-12">
            We are here to help you to recover your password. Enter the email
            address you used when you joined and we'll send you instructions to
            reset your password.
          </p>
          <form onSubmit={handleEmailSubmit} class="space-y-6 w-ful">
            <input
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary-100"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div>
              <button
                type="submit"
                class="w-full px-4 py-2 font-medium text-center text-white bg-[#FF90BC] transition-colors duration-200 rounded-md  hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
              >
                Send
              </button>
            </div>
          </form>
          <div class="text-sm text-gray-600 items-center flex justify-between">
            <Link to="/login">
              <p class="text-gray-800 cursor-pointer hover:text-blue-500 inline-flex items-center ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
                Back
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordForget;
