import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
function Rate() {
  const [cookies] = useCookies(["token"]);
  const token = cookies.Token;
  const { id } = useParams();
  const [rating, setRating] = useState({ rate: 0 });
  const [hover, setHover] = useState(null);
  const totalStars = 5;

  const handleRatingChange = (newRating) => {
    if (newRating >= 1 && newRating <= 5) {
      setRating((prevRating) => ({
        ...prevRating,
        rate: newRating,
      }));
    }
  };

  const addRate = async () => {
    try {
      console.log("Rating:", rating.rate);
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.post(
        `http://localhost:8080/reaction/addrate/${id}`,
        {
          rate: rating.rate, 
        }
      );

      console.log("Response:", response.data); 

      Swal.fire({
        icon: "success",
        title: "your Rate added successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      setRating({ rate: 0 });
    } catch (error) {
      console.error("Error adding rate:", error);
    }
  };

  return (
    <>
      <h1 className="text-3xl  text-[#FF90BC] text-center font-bold mt-20">
        add your rate
      </h1>
      {[...Array(totalStars)].map((star, index) => {
        const currentRating = index + 1;

        return (
          <label key={index}>
            <input
              id="rate"
              type="radio"
              name="rate"
              value={currentRating}
              onChange={() => handleRatingChange(currentRating)}
            />
            <span
              className="star"
              style={{
                color:
                  currentRating <= hover
                    ? "#FF90BC"
                    : currentRating <= rating.rate
                    ? "#FF90BC"
                    : "#e4e5e9",
              }}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(rating.rate)}
              onClick={() => handleRatingChange(currentRating)}
            >
              &#9733;
            </span>
          </label>
        );
      })}
      <button
        className="w-1/12 mb-4 block mx-auto rounded-full bg-[#FF90BC] hover:shadow-lg font-semibold text-white px-6 py-2"
        onClick={addRate}
      >
        Submit Rating
      </button>
    </>
  );
}

export default Rate;
