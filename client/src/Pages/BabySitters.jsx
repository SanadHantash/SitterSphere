import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function BabySitters() {
  const [sitters, setSitters] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/sitters");
        setSitters(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {sitters && sitters.sitters ? (
        <div className="mt-20 my-8 lg:my-10 lg:mt-20 container px-6 mx-auto md:flex-row items-start md:items-center justify-between pb-4 border-b border-gray-300 ">
          {sitters.sitters.map((sitter, index) => (
            <div
              key={sitter.id}
              className="card w-96 glass inline-block bg-gradient-to-r from-[#FFC0D9] to-[#F9F9E0] m-10 p-10 w-18p"
            >
              <figure>
                <img
                  className="block m-auto"
                  src={sitter.image}
                  alt={sitter.user_name}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-[#FF90BC] font-bold">
                  {sitter.user_name}
                </h2>
                <p>Experience: {sitter.experience_level}</p>
                <div className="card-actions justify-end">
                  <Link to={`/babysitterDetails/${sitter.id}`}>
                    <button className="w-1/2 block mx-auto rounded-full bg-[#FF90BC] hover:shadow-lg font-semibold text-white px-6 py-2">
                      show more
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default BabySitters;
