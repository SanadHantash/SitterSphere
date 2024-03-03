import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../Components/CheckoutForm";
function Subscribe() {
  useEffect(() => {
    window.scrollTo(0, 0);
    <></>;
  }, []);
  const stripePromise = loadStripe(
    "pk_test_51O6ir2JHXfBpbbMkPbKEGUGpcDt2kKbOavmI201QuITZ8F3Y48KGAOPE3hvYfSuJcIdhDa8gk7KvAW2FeiwBDPF5004smsWbGA"
  );
  return (
    <>
      <div class="bg-white ">
        <div class="container px-6 py-20 mx-auto">
          <div class="xl:items-center xl:-mx-8 xl:flex">
            <div class="flex flex-col items-center xl:items-start xl:mx-8">
              <h1 class="text-3xl font-medium text-gray-800 capitalize lg:text-4xl dark:text-white">
                Our Pricing Plan
              </h1>

              <div class="mt-4">
                <span class="inline-block w-40 h-1 bg-indigo-900 rounded-full"></span>
                <span class="inline-block w-3 h-1 mx-1 bg-indigo-900 rounded-full"></span>
                <span class="inline-block w-1 h-1 bg-indigo-900 rounded-full"></span>
              </div>

              <p class="mt-4 font-medium text-gray-500 dark:text-gray-300">
                You can get All Access by selecting your plan!
              </p>
            </div>

            <div class="flex-1 xl:mx-8">
              <div class="mt-8 space-y-8 md:-mx-4 md:flex md:items-center md:justify-center md:space-y-0 xl:mt-0">
                <div class="w-full border rounded-lg md:mx-4 dark:border-gray-700">
                  <div class="p-6">
                    <h1 class="text-xl font-medium text-gray-700 capitalize lg:text-3xl dark:text-white">
                      Free
                    </h1>

                    <h2 class="mt-4 text-2xl font-medium text-gray-700 sm:text-4xl dark:text-gray-300">
                      $0.00 <span class="text-base font-medium">/Month</span>
                    </h2>

                    <p class="mt-1 text-gray-500 dark:text-gray-300">
                      Monthly payment
                    </p>
                    <Link to="/subscribe">
                      <button class="w-full px-4 py-2 mt-6 tracking-wide text-white capitalize transition-colors duration-200 transform bg-[#FFC0D9] rounded-md hover:bg-[#FF90BC] focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                        Start Now
                      </button>
                    </Link>
                  </div>

                  <hr class="border-gray-200 dark:border-gray-700" />

                  <div class="p-6">
                    <h1 class="text-lg font-medium text-gray-700 capitalize lg:text-xl dark:text-white">
                      What’s included:
                    </h1>

                    <div class="mt-8 space-y-4">
                      <div class="flex items-center">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-5 h-5 text-red-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                            clip-rule="evenodd"
                          />
                        </svg>

                        <span class="mx-4 text-gray-700 dark:text-gray-300">
                         can post a Request
                        </span>
                      </div>

                      <div class="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-5 h-5 text-indigo-950"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"
                          />
                        </svg>

                        <span class="mx-4 text-gray-700 dark:text-gray-300">
                          Own analytics platform
                        </span>
                      </div>

              

                      <div class="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-5 h-5 text-red-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                            clip-rule="evenodd"
                          />
                        </svg>

                        <span class="mx-4 text-gray-700 dark:text-gray-300">
                          Unlimited users
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full border rounded-lg md:mx-4 dark:border-gray-700">
                  <div className="p-6">
                    <h1 className="text-xl font-medium text-gray-700 capitalize lg:text-3xl dark:text-white">
                      Premium
                    </h1>

                    <h2 className="mt-4 text-2xl font-medium text-gray-700 sm:text-4xl dark:text-gray-300">
                      $60.00{" "}
                      <span className="text-base font-medium">/Monthly</span>
                    </h2>

                    <p className="mt-1 text-gray-500 dark:text-gray-300">
                      Monthly payment
                    </p>

                    <button className="w-full  ">
                      <Elements stripe={stripePromise}>
                        <CheckoutForm />
                      </Elements>
                    </button>
                  </div>

                  <hr class="border-gray-200 dark:border-gray-700" />

                  <div class="p-6">
                    <h1 class="text-lg font-medium text-gray-700 capitalize lg:text-xl dark:text-white">
                      What’s included:
                    </h1>

                    <div class="mt-8 space-y-4">
                      <div class="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-5 h-5 text-indigo-950"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"
                          />
                        </svg>

                        <span class="mx-4 text-gray-700 dark:text-gray-300">
                          can post a Request
                        </span>
                      </div>

                      <div class="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-5 h-5 text-indigo-950"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"
                          />
                        </svg>

                        <span class="mx-4 text-gray-700 dark:text-gray-300">
                          Own analytics platform
                        </span>
                      </div>

                

                      <div class="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-5 h-5 text-indigo-950"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"
                          />
                        </svg>

                        <span class="mx-4 text-gray-700 dark:text-gray-300">
                          Unlimited users
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Subscribe;
