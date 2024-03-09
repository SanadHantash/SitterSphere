import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sitterstats from "../components/Sitterstats";
import Sittingtimes from '../components/Sittingtimes';
import Sittfamilytimes from '../components/Sittfamilytimes';

function SitterDetail() {
  const [sitterDetails, setSitterDetails] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchSitterDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/dashboard/sitter/detail/${id}`
        );
        setSitterDetails(response.data);
        console.log("Sitter Details API response:", response.data);
      } catch (error) {
        console.error("Error fetching sitter details:", error.response);
      }
    };

    fetchSitterDetails();
  }, [id]);

  return (
    <>
  <div className="flex justify-center items-center gap-8">
  <img
    src={
      sitterDetails.sitter &&
      sitterDetails.sitter.length > 0 &&
      sitterDetails.sitter[0].image
        ? sitterDetails.sitter[0].image
        : "placeholder_image_url_or_default"
    }
    alt="Image"
    className="w-64 group-hover:w-36 group-hover:h-36 h-64 object-center object-cover rounded-full transition-all duration-500 delay-500 transform"
  />
  <div className="flex flex-col items-center gap-6">
    <Sitterstats />
  </div>
</div>

<Sittingtimes />
    <Sittfamilytimes />
      
    </>
  );
}

export default SitterDetail;
