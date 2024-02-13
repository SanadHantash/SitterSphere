import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function BabySitters() {
    const[sitters,setSitters]=useState([])
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              "http://localhost:8080/sitters"
            );
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
      <div key={sitter.id} className="card w-96 glass" style={{ background: 'linear-gradient(to right, #FFC0D9, #F9F9E0)', display: 'inline-block', margin: '10px', padding: '10px', width: '18%'}}>
          <figure>
          <img src={sitter.image} alt={sitter.user_name} style={{ display: 'block', margin: 'auto' }} />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-[#FF90BC] font-bold">{sitter.user_name}</h2>
          <p >Experience: {sitter.experience_level}</p>
          <div className="card-actions justify-end">
          <button className="w-100 block mx-auto rounded-full bg-[#FF90BC] hover:shadow-lg font-semibold text-white px-6 py-2">show more</button>
          </div>
        </div>
        {(index + 1) % 4 === 0 && <div className="w-full md:hidden lg:hidden xl:hidden"></div>}
      </div>
    ))}
  </div>
) : (
  <p>Loading...</p>
)}
</>







  
   
  )
}

export default BabySitters