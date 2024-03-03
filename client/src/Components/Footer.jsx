import React, { useState } from "react";
import logo2 from "../Assets/logo2.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Footer() {
  const [cookies] = useCookies(["token"]);
  const [review, setReview] = useState("");
  const token = cookies.Token;
  const { headers } = useAuth();

  const navigate = useNavigate();
  const addTestimonial = async (event) => {
    event.preventDefault();

    try {
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.post(
        "http://localhost:8080/createtestimonial",
        { testimonial: review },
        { headers }
      );
      console.log("Testimonial added:", response.data);
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 409) {
          Swal.fire({
            icon: "error",
            title: "Adding Testimonial Failed!",
            text: "You can't write more than one review!",
          });
        } else if (status === 400) {
          Swal.fire({
            icon: "error",
            title: "Please Log in to add a review :)",
            text: "Sign up if you're new!",
          }).then(() => {
            navigate("/signup");
          });
        }
      }
      console.error("Error adding Testimonial:", error);
    }
  };

  const handleInputChange = (event) => {
    setReview(event.target.value);
  };

  return (
    <footer class=" dark:bg-gray-900 bg-[#FF90BC]">
      <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0 flex flex-row items-center">
            <a href="/" className="flex">
              <img
                src={logo2}
                className="h-18 w-48 object-contain"
                alt="WiseAssist Logo"
              />
            </a>
            <div className="ml-6">
              <div className="mb-4">
                <h2 className="text-sm font-bold text-black uppercase dark:text-white">
                  Write a Review
                </h2>
                <p className="text-indigo-950 dark:text-gray-400 font-medium">
                  Share your experience with us!
                </p>
              </div>
              <form
                onSubmit={addTestimonial}
                className="flex flex-col sm:flex-row"
              >
                <label htmlFor="review" className="sr-only">
                  Email
                </label>
                <div className="flex flex-col sm:flex-row">
                  <input
                    type="textarea"
                    id="review"
                    value={review}
                    onChange={handleInputChange}
                    placeholder="Write A Review"
                    className="w-full sm:w-auto border border-gray-100 p-2 focus:outline-none focus:border-indigo-500 focus:ring-1 ring-indigo-500 sm:mr-2 mb-2 sm:mb-0"
                  />
                  <button className="w-full sm:w-auto bg-indigo-950 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-none hover:bg-indigo-900">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 class="mb-6 text-sm font-bold text-black uppercase dark:text-white">
                Who We are?
              </h2>
              <ul class="text-indigo-950 dark:text-gray-400 font-medium">
                <li>
                  <Link to="/about" class="hover:text-indigo-900">
                    About Us
                  </Link>
                </li>
                <li class="mb-0">
                  <Link to="/Contactus" class="hover:text-indigo-900">
                    Contact
                  </Link>
                </li>
                {/* <li>
                  <Link to="/faq" class="hover:text-indigo-900">
                    Faq
                  </Link>
                </li> */}
              </ul>
            </div>
            <div>
              <h2 class="mb-6 text-sm font-bold text-black   uppercase dark:text-white">
                Contact Us
              </h2>
              <ul class="text-indigo-950 dark:text-gray-400 font-medium">
                <li class="mb-0">
                  <a
                    href="https://github.com/themesberg/flowbite"
                    class="hover:text-indigo-900"
                  >
                   sittersphere5@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/4eeurUVvTy"
                    class="hover:text-indigo-900"
                  >
                    Jordan - Zarqa
                  </a>
                </li>
                {/* <li>
                  <a
                    href="https://discord.gg/4eeurUVvTy"
                    class="hover:text-indigo-900"
                  >
                    (+962) 791301
                  </a>
                </li> */}
              </ul>
            </div>
            <div>
              <h2 class="mb-6 text-sm  text-black font-bold  uppercase dark:text-white">
                Get Involved
              </h2>
              <ul class="text-indigo-950 dark:text-gray-400 font-medium">
                <li class="mb-4">
                  <Link to="/signup" class="hover:text-indigo-900">
                    SignUp for Newsletters
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div class="sm:flex sm:items-center sm:justify-between">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <a href="/" class="hover:text-indigo-900">
              SitterSphere
            </a>
            . All Rights Reserved.
          </span>
          <div class="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
            <a
              href="/"
              class="text-indigo-950 hover:text-indigo-900 dark:hover:text-white"
            >
              <svg
                class="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="sr-only">Facebook page</span>
            </a>
            <a
              href="/"
              class="text-indigo-950 hover:text-indigo-900 dark:hover:text-white"
            >
              <svg
                class="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 21 16"
              >
                <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
              </svg>
              <span class="sr-only">Discord community</span>
            </a>
            <a
              href="/"
              class="text-indigo-950 hover:text-indigo-900 dark:hover:text-white"
            >
              <svg
                class="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 17"
              >
                <path
                  fill-rule="evenodd"
                  d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="sr-only">Twitter page</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
