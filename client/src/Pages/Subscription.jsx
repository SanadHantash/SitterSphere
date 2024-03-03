import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Components/CheckoutForm";
import "../style.css";

function Subscription() {
  useEffect(() => {
    window.scrollTo(0, 0);
    <></>;
  }, []);
  const stripePromise = loadStripe(
    "pk_test_51O6ir2JHXfBpbbMkPbKEGUGpcDt2kKbOavmI201QuITZ8F3Y48KGAOPE3hvYfSuJcIdhDa8gk7KvAW2FeiwBDPF5004smsWbGA"
  );

  return (
    <>
      <div class="relative text-gray-900 pt-12 pr-0 pb-14 pl-0 w-full bg-indigo-950 flex items-center justify-center ">
        <div class="w-full pt-4 pr-5 pb-6 pl-5 mt-0 mr-auto mb-0 ml-auto space-y-5 sm:py-8 md:py-12 sm:space-y-8 md:space-y-16 max-w-7xl">
          <div class="flex flex-col items-center sm:px-5 md:flex-row">
            <div class="flex flex-col items-start justify-center w-full h-full pt-6 pr-0 pb-6 pl-0 mb-6 md:mb-0 ">
              <div
                class="flex flex-col items-start justify-center h-full space-y-3 transform md:pr-10 lg:pr-16
          md:space-y-5"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center  border-indigo-950 absolute top-2/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-solid bg-white p-4 sm:p-6 md:p-8 max-w-md w-11/12 md:w-[40rem] rounded-3xl mb-80">
        <div className="w-full">
          <div className="flex flex-col  pb-4">
            <div className="flex flex-row justify-between items-center border-b border-solid  bg-[#F7F1EE]">
              <div className="font-bold">Premium Membership</div>
              <div className="font-bold">$60.00</div>
            </div>

            <div className="flex flex-col justify-between  items-center pt-4 w-full">
              <div className="flex flex-row justify-between w-full items-center pt-4">
                <span className="font-bold">Start 1 Month</span>
                <span className="font-bold">Today</span>
              </div>
              <div className="flex flex-row justify-between w-full items-center pt-4">
                <span className="font-bold">Start billing date</span>
                <span className="font-bold">20/11/2023</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="product">
        <div>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </>
  );
}

export default Subscription;
