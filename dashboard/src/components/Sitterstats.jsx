import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useCookies } from "react-cookie";

function Sitterstats() {
  const [applicationCount, setApplicatinCount] = useState(0);
  const [sittingCount, setSittingCount] = useState(0);
  const { headers } = useAuth();
  const [cookies] = useCookies(["token"]);
  const token = cookies.Token;
  const { id } = useParams();

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = token;
    axios
      .get(`http://localhost:8080/dashboard/sitter/${id}/applicationscount`)
      .then((response) => {
        setApplicatinCount(response.data.count);
      })
      .catch((error) => {
        console.error("Error fetching application count: ", error);
      });
  }, [id]);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = token;
    axios
      .get(`http://localhost:8080/dashboard/sitter/${id}/sittingscount`)
      .then((response) => {
        setSittingCount(response.data.count);
      })
      .catch((error) => {
        console.error("Error fetching application count: ", error);
      });
  }, [id]);

  return (
    <>
      <div className="flex justify-center items-center ">
        <section
          className="p-6 my-6 bg-[#FF90BC] bg-cover text-indigo-950 border border-solid border-[#FF90BC] flex justify-center items-center"
          style={{ backgroundColor: "#FF90BC", width: "max-content" }}
        >
          <div className="flex justify-center items-center gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
            <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 border border-solid border-indigo-950 dark:bg-gray-900 dark:text-gray-100">
              <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  className="h-9 w-9 dark:text-gray-800"
                >
                  <path d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"></path>
                  <path d="M256,384A104,104,0,0,0,360,280H152A104,104,0,0,0,256,384Z"></path>
                  <polygon points="205.757 228.292 226.243 203.708 168 155.173 109.757 203.708 130.243 228.292 168 196.827 205.757 228.292"></polygon>
                  <polygon points="285.757 203.708 306.243 228.292 344 196.827 381.757 228.292 402.243 203.708 344 155.173 285.757 203.708"></polygon>
                </svg>
              </div>
              <div className="flex flex-col justify-center align-middle">
                <p className="text-3xl font-semibold leadi">
                  {applicationCount}
                </p>
                <p className="capitalize">Requests</p>
              </div>
            </div>

            <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 border border-solid border-indigo-950 dark:bg-gray-900 dark:text-gray-100">
              <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  className="h-9 w-9 dark:text-gray-800"
                >
                  <path d="M425.706,142.294A240,240,0,0,0,16,312v88H160V368H48V312c0-114.691,93.309-208,208-208s208,93.309,208,208v56H352v32H496V312A238.432,238.432,0,0,0,425.706,142.294Z"></path>
                  <rect width="32" height="32" x="80" y="264"></rect>
                  <rect width="32" height="32" x="240" y="128"></rect>
                  <rect width="32" height="32" x="136" y="168"></rect>
                  <rect width="32" height="32" x="400" y="264"></rect>
                  <path d="M297.222,335.1l69.2-144.173-28.85-13.848L268.389,321.214A64.141,64.141,0,1,0,297.222,335.1ZM256,416a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,416Z"></path>
                </svg>
              </div>
              <div className="flex flex-col justify-center align-middle">
                <p className="text-3xl font-semibold leadi">{sittingCount}</p>
                <p className="capitalize">Sitting times</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Sitterstats;
