import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/logo3.png";
import uk from "../Assets/uk.png";
import ar from "../Assets/ar.png";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoggedIn, logout, isRegistered } = useAuth();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const [isProfileOpen, setProfileOpen] = useState(false);

  const toggleProfileDropdown = () => {
    setProfileOpen(!isProfileOpen);
  };
  const [isLanguageOpen, setLanguageOpen] = useState(false);

  const toggleLanguageDropdown = () => {
    setLanguageOpen(!isLanguageOpen);
  };
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 py-1 dark:bg-gray-900 w-full">
        <div class="flex justify-between px-4 mx-auto flex-wrap lg:flex-nowrap">
          <a href="/" class="flex items-center">
            <img
              src={logo}
              className="h-auto w-24"
              alt="SitterSphere Logo"
            />
          </a>
          <div class="flex items-center lg:order-2">
            {" "}
            <div
              className={`${
                isLoggedIn ? "hidden" : "flex"
              }   flex-1  justify-end items-center align-center `}
            >
              <Link to="/Login">
                <button
                  type="button"
                  className="text-black hover:text-indigo-950 font-medium rounded-lg text-sm px-1 py-2.5 md:ml-1 md:px-10"
                >
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button
                  type="button"
                  className="shadow-sm shadow-[#292742] text-white bg-[#FF90BC] hover:bg-[#FFC0D9] font-medium rounded-lg text-sm px-2 py-2.5 md:ml-1 md:px-10 "
                >
                  Sign Up
                </button>
              </Link>
            </div>
            {/* <Link to="/profile"> */}
            <div className="relative">
              <button
                onClick={toggleProfileDropdown}
                type="button"
                className={`${
                  isRegistered ? "flex" : "hidden"
                }  flex-1  justify-end items-center align-center  text-indigo-950 font-medium rounded-lg text-sm px-2 py-2.5 md:ml-1 md:px-10 `}
              >
                Profile
                <svg
                  class="w-2.5 h-2.5 ml-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-lg z-10">
                  <Link to="/profile">
                    <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">
                      Profile
                    </button>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setProfileOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
            {/* </Link> */}
            <button
              data-collapse-toggle="mobile-menu-2"
              onClick={toggleMobileMenu}
              type="button"
              class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <svg
                class="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className={`w-full lg:w-auto lg:flex lg:items-center ${
              isMobileMenuOpen ? "block" : "hidden"
            }`}
            id="mobile-menu-2"
          >
            <ul className="lg:flex lg:space-x-8 lg:mt-0 font-medium">
              <li>
                <Link
                  to="/"
                  class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/sitters"
                  class="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-indigo-900 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Babysitters
                </Link>
              </li>
              <li>
                <Link
                  to="/requests"
                  class="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-indigo-900  lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  FamiliesRequests
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  class="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-indigo-900  lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  class="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-indigo-900  lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/Contactus"
                  class="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-indigo-900  lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </Link>
              </li>
              <li>
                <div className="relative">
                  <button
                    onClick={toggleLanguageDropdown}
                    type="button"
                    className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-indigo-900 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                  >
                    <img src={uk} className="h-5 w-5 mt-0.5" alt="language" />
                    <svg
                      class="w-2.5 h-2.5 ml-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  {isLanguageOpen && (
                    <div className="absolute right-0 left-1 mt-2 py-2 w-48 bg-white rounded-lg shadow-lg z-10">
                      <Link to="/" className="block w-full">
                        <button className="flex items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          <img
                            src={uk}
                            className="h-5 w-5 mt-0.5 mr-2"
                            alt="language"
                          />
                          <span>English</span>
                        </button>
                      </Link>
                      <Link to="/" className="block w-full">
                        <button className="flex items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          <img
                            src={ar}
                            className="h-5 w-5 mt-0.5 mr-2"
                            alt="language"
                          />
                          <span>Arabic</span>
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
