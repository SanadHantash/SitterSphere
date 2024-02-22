import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import months from "../Assets/0-12months.svg";
import years1_2 from "../Assets/1-2years.svg";
import years2_3 from "../Assets/1-2years.svg";
import years3_5 from "../Assets/2-3years.svg";
import years5 from "../Assets/5+years.svg";
import not0_12 from "../Assets/0-12months(not).svg";
import not1_2 from "../Assets/1-2years(not).svg";
import not2_3 from "../Assets/2-3years(not).svg";
import not3_5 from "../Assets/3-5years(not).svg";
import not5 from "../Assets/5+years(not).svg";

import cooking from "../Assets/cooking.svg";
import firstaid from "../Assets/firstaid.svg";
import nonsmoker from "../Assets/nonsmoker.svg";
import draw from "../Assets/draw.svg";
import car from "../Assets/car.svg";
import driver from "../Assets/drive.svg";
import music from "../Assets/music.svg";
import reading from "../Assets/reading.svg";
 import notmusic from "../Assets/music(not).svg";
import notcooking from "../Assets/cooking(not).svg";
import notcar from "../Assets/car(not).svg";
import notdraw from "../Assets/draw(not).svg";
import notdrive from "../Assets/drive(not).svg";
import notreading from "../Assets/reading(not).svg";
import smoker from "../Assets/nonsmoker(not).svg";
import notfirstaid from "../Assets/firstaid(not).svg";



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
    <>
      <div class="w-full max-w-7xl px-4 mx-auto sm:px-8 mt-24">
        <blockquote class="relative grid items-center bg-gradient-to-b from-[#FF90BC] to-[#F9F9E0] shadow-xl md:grid-cols-3 rounded-xl">
          <img
            class="hidden object-cover w-full h-full rounded-l-xl md:block"
            style={{ clipPath: "polygon(0 0%, 100% 0%, 75% 100%, 0% 100%)" }}
            src={
              babysitterDetails.sitter &&
              babysitterDetails.sitter.length > 0 &&
              babysitterDetails.sitter[0].image
                ? babysitterDetails.sitter[0].image
                : "placeholder_image_url_or_default"
            }
            alt="Image"
          />

          <article class="relative p-6 md:p-8 md:col-span-2">
            <div class="space-y-8">
              <p class="text-base sm:leading-relaxed md:text-base">
                {babysitterDetails.sitter &&
                babysitterDetails.sitter[0].description
                  ? babysitterDetails.sitter[0].description
                  : "Description Not Available"}
              </p>

              <footer class="flex items-center space-x-4 md:space-x-0">
                <span class="font-extrabold text-2xl text-[#FF90BC]">
                  {" "}
                  {babysitterDetails.sitter &&
                  babysitterDetails.sitter[0].user_name
                    ? babysitterDetails.sitter[0].user_name
                    : "Description Not Available"}
                </span>
              </footer>
            </div>
          </article>
        </blockquote>
      </div>

      <h1 className="text-3xl text-center font-bold mt-20">
        Provides care for ages
      </h1>

      <section class="text-gray-700 body-font">
        <div class="container px-4 py-20 mx-auto">
          <div class="flex flex-wrap -m-4 text-center">
            <div class="p-2 md:w-1/5 sm:w-1/5 w-full">
              <div class="border-2 bg-[#F9F9E0] border-gray-600 px-2 py-4 rounded-lg transform transition duration-500 hover:scale-110">
                {babysitterDetails.sitter &&
                babysitterDetails.sitter[0]["0_12_months"] ? (
                  <>
                    <img
                      src={months}
                      alt="months Icon"
                      class="w-20 h-20 inline-block mr-2"
                    />
                    <h2 class="title-font font-medium text-2xl text-[#FF90BC]">
                      0-12 months
                    </h2>
                  </>
                ) : (
                  <>
                    <img
                      src={not0_12}
                      alt="years1-2 Icon"
                      class="w-20 h-20 inline-block mr-2"
                    />
                    <h2 class="title-font font-medium text-2xl text-[#C9C9C9]">
                      0-12 months
                    </h2>
                  </>
                )}
              </div>
            </div>
            <div class="p-2 md:w-1/5 sm:w-1/5 w-full">
              <div class="border-2 bg-[#F9F9E0] border-gray-600 px-2 py-4 rounded-lg transform transition duration-500 hover:scale-110">
                {babysitterDetails.sitter &&
                babysitterDetails.sitter[0]["1_2_years"] ? (
                  <>
                    <img
                      src={years1_2}
                      alt="years1-2 Icon"
                      class="w-20 h-20 inline-block mr-2"
                    />
                    <h2 class="title-font font-medium text-2xl text-[#FF90BC]">
                      1-2 years
                    </h2>
                  </>
                ) : (
                  <>
                    <img
                      src={not1_2}
                      alt="years1-2 Icon"
                      class="w-20 h-20 inline-block mr-2"
                    />
                    <h2 class="title-font font-medium text-2xl text-[#C9C9C9]">
                      1-2 years
                    </h2>
                  </>
                )}
              </div>
            </div>
            <div class="p-2 md:w-1/5 sm:w-1/5 w-full">
              <div class="border-2 bg-[#F9F9E0] border-gray-600 px-2 py-4 rounded-lg transform transition duration-500 hover:scale-110">
                {babysitterDetails.sitter &&
                babysitterDetails.sitter[0]["2_3_years"] ? (
                  <>
                    <img
                      src={years2_3}
                      alt="years2-3 Icon"
                      class="w-20 h-20 inline-block mr-2"
                    />
                    <h2 class="title-font font-medium text-2xl text-[#FF90BC]">
                      2-3 years
                    </h2>
                  </>
                ) : (
                  <>
                    <img
                      src={not2_3}
                      alt="years1-2 Icon"
                      class="w-20 h-20 inline-block mr-2"
                    />
                    <h2 class="title-font font-medium text-2xl text-[#C9C9C9]">
                      2-3 years
                    </h2>
                  </>
                )}
              </div>
            </div>
            <div class="p-2 md:w-1/5 sm:w-1/5 w-full">
              <div class="border-2 bg-[#F9F9E0] border-gray-600 px-2 py-4 rounded-lg transform transition duration-500 hover:scale-110">
                {babysitterDetails.sitter &&
                babysitterDetails.sitter[0]["3_5_years"] ? (
                  <>
                    <img
                      src={years3_5}
                      alt="years3-5 Icon"
                      class="w-20 h-20 inline-block mr-2"
                    />
                    <h2 class="title-font font-medium text-2xl text-[#FF90BC]">
                      3-5 months
                    </h2>
                  </>
                ) : (
                  <>
                    <img
                      src={not3_5}
                      alt="years1-2 Icon"
                      class="w-20 h-20 inline-block mr-2"
                    />
                    <h2 class="title-font font-medium text-2xl text-[#C9C9C9]">
                      2-3 years
                    </h2>
                  </>
                )}
              </div>
            </div>
            <div class="p-2 md:w-1/5 sm:w-1/5 w-full">
              <div class="border-2 bg-[#F9F9E0] border-gray-600 px-2 py-4 rounded-lg transform transition duration-500 hover:scale-110">
                {babysitterDetails.sitter &&
                babysitterDetails.sitter[0]["3_5_years"] ? (
                  <>
                    <img
                      src={years5}
                      alt="+5years Icon"
                      class="w-20 h-20 inline-block mr-2"
                    />
                    <h2 class="title-font font-medium text-2xl text-[#FF90BC]">
                      +5 years
                    </h2>
                  </>
                ) : (
                  <>
                    <img
                      src={not5}
                      alt="years1-2 Icon"
                      class="w-20 h-20 inline-block mr-2"
                    />
                    <h2 class="title-font font-medium text-2xl text-[#C9C9C9]">
                      +5 years
                    </h2>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      

<div class="grid grid-cols-4 sm:grid-cols-4 gap-2 bg-[#F9F9E0] mb-20 p-5 pt-10">

  
        <span class="inline-block rounded-lg p-2">
           <div class="inline-flex align-middle justify-center items-center select-none text-white">
           {babysitterDetails.sitter &&
                babysitterDetails.sitter[0]["has_car"] ? (
                  <>
                    <img
                      src={car}
                      alt="car Icon"
                      class="w-20 h-20 inline-block mr-2"
                    />
                    <h2 class="title-font font-medium text-2xl text-[#FF90BC]">
                      has Car
                    </h2>
                  </>
                ) : (
                  <>
                    <img
                      src={notcar}
                      alt="years1-2 Icon"
                      class="w-20 h-20 inline-block mr-2"
                    />
                    <h2 class="title-font font-medium text-2xl line-through decoration-2 decoration-black text-[#C9C9C9]">
                    has Car
                    </h2>
                  </>
                )}
           </div>
        </span>



        <span class="inline-block rounded-lg p-3">
            <div class="inline-flex align-middle justify-center items-center select-none text-white">
            {babysitterDetails.sitter &&
                babysitterDetails.sitter[0]["non_smoker"] ? (
                  <>
                    <img
                      src={nonsmoker}
                      alt="months Icon"
                      class="w-20 h-20 inline-block mr-2"
                    />
                    <h2 class="title-font font-medium text-2xl text-[#FF90BC]">
                      non smoker
                    </h2>
                  </>
                ) : (
                  <>
                    <img
                      src={smoker}
                      alt="years1-2 Icon"
                      class="w-20 h-20 inline-block mr-2"
                    />
                    <h2 class="title-font font-medium text-2xl line-through decoration-2 decoration-black text-[#C9C9C9]">
                     non smoker
                    </h2>
                  </>
                )}
            </div>
        </span>


  
        <span class="inline-block rounded-lg p-3">
            <div class="inline-flex align-middle justify-center items-center select-none text-white">
            {babysitterDetails.sitter &&
                babysitterDetails.sitter[0]["cooking"] ? (
                  <>
                    <img
                      src={cooking}
                      alt="months Icon"
                      class="w-20 h-20 inline-block mr-2"
                    />
                    <h2 class="title-font font-medium text-2xl text-[#FF90BC]">
                      Cooking
                    </h2>
                  </>
                ) : (
                  <>
                    <img
                      src={notcooking}
                      alt="years1-2 Icon"
                      class="w-20 h-20 inline-block mr-2"
                    />
                    <h2 class="title-font font-medium text-2xl text-[#C9C9C9]">
                     Cooking
                    </h2>
                  </>
                )}
            </div>
        </span>

     
    
        <span  class="inline-block rounded-lg p-2">
           <div class="inline-flex align-middle justify-center items-center select-none text-white">
           {babysitterDetails.sitter &&
                babysitterDetails.sitter[0]["draw"] ? (
                  <>
                    <img
                      src={draw}
                      alt="months Icon"
                      class="w-20 h-20 inline-block mr-2"
                    />
                    <h2 class="title-font font-medium text-2xl text-[#FF90BC]">
                      Draw
                    </h2>
                  </>
                ) : (
                  <>
                    <img
                      src={notdraw}
                      alt="years1-2 Icon"
                      class="w-20 h-20 inline-block mr-2"
                    />
                    <h2 class="title-font font-medium text-2xl line-through decoration-2 decoration-black text-[#C9C9C9]">
                     Draw
                    </h2>
                  </>
                )}
           </div>
        </span>
      
  
  
        <span  class="inline-block rounded-lg p-3">
           <div class="inline-flex align-middle justify-center items-center select-none text-white">
           {babysitterDetails.sitter &&
                babysitterDetails.sitter[0]["first_aid"] ? (
                  <>
                    <img
                      src={firstaid}
                      alt="months Icon"
                      class="w-20 h-20 inline-block mr-2"
                    />
                    <h2 class="title-font font-medium text-2xl text-[#FF90BC]">
                      First Aid
                    </h2>
                  </>
                ) : (
                  <>
                    <img
                      src={notfirstaid}
                      alt="years1-2 Icon"
                      class="w-20 h-20 inline-block mr-2"
                    />
                    <h2 class="title-font font-medium line-through  decoration-2 decoration-black text-2xl text-[#C9C9C9]">
                    First Aid
                    </h2>
                  </>
                )}
           </div>
        </span>
        <span  class="inline-block rounded-lg p-3">
           <div class="inline-flex align-middle justify-center items-center select-none text-white">
           {babysitterDetails.sitter &&
                babysitterDetails.sitter[0]["music"] ? (
                  <>
                    <img
                      src={music}
                      alt="months Icon"
                      class="w-20 h-20 inline-block mr-2"
                    />
                    <h2 class="title-font font-medium text-2xl text-[#FF90BC]">
                     Music
                    </h2>
                  </>
                ) : (
                  <>
                    <img
                      src={notmusic}
                      alt="years1-2 Icon"
                      class="w-20 h-20 inline-block mr-2"
                    />
                    <h2 class="title-font font-medium line-through decoration-2 decoration-black text-2xl text-[#C9C9C9]">
                     Music
                    </h2>
                  </>
                )}
           </div>
        </span>
        <span  class="inline-block rounded-lg p-3">
           <div class="inline-flex align-middle justify-center items-center select-none text-white">
           {babysitterDetails.sitter &&
                babysitterDetails.sitter[0]["can_drive"] ? (
                  <>
                    <img
                      src={driver}
                      alt="months Icon"
                      class="w-20 h-20 inline-block mr-2"
                    />
                    <h2 class="title-font font-medium text-2xl text-[#FF90BC]">
                     can drive
                    </h2>
                  </>
                ) : (
                  <>
                    <img
                      src={notdrive}
                      alt="years1-2 Icon"
                      class="w-20 h-20 inline-block mr-2"
                    />
                    <h2 class="title-font font-medium text-2xl line-through decoration-2 decoration-black text-[#C9C9C9]">
                     can drive
                    </h2>
                  </>
                )}
           </div>
        </span>
        <span  class="inline-block rounded-lg p-3">
           <div class="inline-flex align-middle justify-center items-center select-none text-white">
           {babysitterDetails.sitter &&
                babysitterDetails.sitter[0]["reading"] ? (
                  <>
                    <img
                      src={reading}
                      alt="months Icon"
                      class="w-20 h-20 inline-block mr-2"
                    />
                    <h2 class="title-font font-medium text-2xl text-[#FF90BC]">
                      Reading Stories
                    </h2>
                  </>
                ) : (
                  <>
                    <img
                      src={notreading}
                      alt="years1-2 Icon"
                      class="w-20 h-20 inline-block mr-2"
                    />
                    <h2 class="title-font font-medium text-2xl line-through decoration-2 decoration-black text-[#C9C9C9]">
                    Reading Stories
                    </h2>
                  </>
                )}
           </div>
        </span>
      
  
</div>

      
    </>
  );
}

export default BabySitterdetail;
