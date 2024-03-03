import React from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CardSection from "./CardSection";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51O6ir2JHXfBpbbMkPbKEGUGpcDt2kKbOavmI201QuITZ8F3Y48KGAOPE3hvYfSuJcIdhDa8gk7KvAW2FeiwBDPF5004smsWbGA"
);

const CheckoutForm = () => {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const handlePremiumCheckout = async () => {
    // console.log("Redirecting to /success");
    // navigate("/success");
    const token = cookies.Token;

    try {
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.post("http://localhost:8080/subscribtion");

      const sessionId = response.data.id;

      const stripe = await stripePromise;

      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });
      if (error) {
        console.error("Error redirecting to checkout:", error);
      } else {
        console.log("Redirecting to /success");
        navigate("/success");
      }
      console.log("Response from backend:", response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handlePremiumCheckout}
        className="w-full px-4 py-2 mt-6 tracking-wide text-white capitalize transition-colors duration-200 transform bg-[#FFC0D9] rounded-md hover:bg-[#FF90BC] focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80"
      >
        Start Now
      </button>
    </div>
  );
};

const PremiumSubscribe = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default PremiumSubscribe;
