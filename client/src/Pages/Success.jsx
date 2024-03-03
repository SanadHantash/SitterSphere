import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import background from "../Assets/back.png";

function Success() {
  const [cookies] = useCookies(["token"]);
  const token = cookies.Token;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const updateUserRole = async () => {
      try {
        axios.defaults.headers.common["Authorization"] = token;

        const response = await axios.get("http://localhost:8080/updaterole", {
          headers: {
            Authorization: token,
          },
        });

        console.log("User Role Update API response:", response.data);
      } catch (error) {
        console.error("Error updating user role:", error.response);
      }
    };

    updateUserRole();
  }, [token]);

  return (
    <div
      class="flex items-center justify-center h-screen"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
      }}
    >
      <div class="p-4 rounded shadow-lg ring ring-[#522883]/50">
        <div class="flex flex-col items-center space-y-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="text-[#522883] w-28 h-28"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 class="text-4xl font-bold">Thank You !</h1>
          <p>Thank you for completing your secure online payment.</p>
          <p> Have a great day! :) </p>
          <Link to="/">
            <button class="inline-flex items-center px-4 py-2 text-white bg-[#522883] border border-[#522883] rounded-full hover:bg-[#4f3869] focus:outline-none focus:ring">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-3 h-3 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              <span class="text-sm font-medium">Home</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Success;
