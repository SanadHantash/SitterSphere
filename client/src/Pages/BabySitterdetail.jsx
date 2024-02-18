import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";




function BabySitterdetail() {
    const [babysitterDetails, setBabysitterDetails] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        const fetchBabySitterDetails = async () => {
          try {
           
            const response = await axios.get(
              `http://localhost:8080/sitter/detail/${id}`
            );
            setBabysitterDetails(response.data);
            console.log("Sitter Details API response:", response.data);
          } catch (error) {
            console.error("Error fetching sitter details:", error.response);
          }
        };
    
        fetchBabySitterDetails();
      }, [id]);
  return (
    <div className="container">
      <div className="grid grid-cols-2 gap-4">
    <div className="flex items-center">
        <img 
            className="float-none rounded-full mt-20 ml-10"    
            src={
                babysitterDetails.sitter &&
                babysitterDetails.sitter.length > 0 &&
                babysitterDetails.sitter[0].image
                    ? babysitterDetails.sitter[0].image
                    : "placeholder_image_url_or_default"
            }
        />
        <div className="ml-4">
            <div className="mb-4 bg-opacity-60 text-2xl mix-blend-screen px-4">
                {babysitterDetails.sitter && babysitterDetails.sitter[0].user_name ? babysitterDetails.sitter[0].user_name : "Username Not Available"}
            </div>
            <div className="mb-4 bg-opacity-60 text-2xl mix-blend-screen px-4">
                Experience: {babysitterDetails.sitter && babysitterDetails.sitter[0].experience_level ? babysitterDetails.sitter[0].experience_level : "Experience level Not Available"}
            </div>
        </div>
    </div>
    <div className="flex items-center">
        <div className="ml-4">
            <div className="mb-4 bg-opacity-60 text-2xl mix-blend-screen px-4">
                Education: {babysitterDetails.sitter && babysitterDetails.sitter[0].education ? babysitterDetails.sitter[0].education : "Education Not Available"}
            </div>
            <div className="mb-4 bg-opacity-60 text-2xl mix-blend-screen px-4">
                Rate: {babysitterDetails.sitter && babysitterDetails.sitter[0].rate ? babysitterDetails.sitter[0].rate : "Rate Not Available"}
            </div>
        </div>
    </div>
</div>



 
 <p className="text-gray-600 mb-4 m-10 "> {babysitterDetails.sitter && babysitterDetails.sitter[0].description
                ? babysitterDetails.sitter[0].description
                : "Description Not Available"}</p>

</div>

  )
}

export default BabySitterdetail