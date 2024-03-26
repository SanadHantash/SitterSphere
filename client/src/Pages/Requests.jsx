import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Requests() {
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const indexOfLastRecord = page * pageSize;
  const indexOfFirstRecord = indexOfLastRecord - pageSize;
  const currentRecords = requests.slice(indexOfFirstRecord, indexOfLastRecord);

  const nPages = Math.ceil(requests.length / pageSize);
  const pageNumbers = [...Array(nPages).keys()].map((num) => num + 1);

  const goToNextPage = () => {
    if (page < nPages) setPage(page + 1);
  };

  const goToPrevPage = () => {
    if (page > 1) setPage(page - 1);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/family/allrequests?page=${page}&limit=${pageSize}`
        );
        setRequests(response.data.requests);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page, pageSize]);

  
  return (
    <>
      <div className="flex justify-center  mt-32 mb-5">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
    {requests && currentRecords ? (
      currentRecords.map((request, index) => (
        <a
          key={index}
          className="p-8 max-w-lg border border-[#FF90BC] rounded-2xl hover:shadow-xl hover:shadow-indigo-50 flex flex-col items-center"
          href="#"
        >
          <img
            src={request.image}
            className="shadow rounded-lg overflow-hidden w-full h-96 border"
            alt="Exercise"
          />
          <div className="mt-8">
            <h4 className="font-bold text-xl">{request.title}</h4>
            <p className="mt-2 text-gray-600">
             Date: {request.time}.
            </p>
            <p className="mt-2 text-gray-600">
            Location:  {request.address}.
            </p>
          
            <div className="mt-5">
                  <Link to={`/RequestDetail/${request.id}`}>
                    <button 
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-[#FF90BC] px-5 py-4 text-sm font-medium leading-4 text-white shadow-sm hover:bg-[#FFC0D9]">
                    Read More
                    </button>
                  </Link>
                </div>
          </div>
        </a>
      ))
    ) : (
      <p>Loading...</p>
    )}
  </div>
</div>
<div className="flex justify-center mt-4">

<button
  onClick={goToPrevPage}
  disabled={page === 1}
  className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full"
>
  Prev
</button>
{pageNumbers.map((number) => (
  <button
    key={number}
    onClick={() => setPage(number)}
    className={`mr-2 ${
      page === number
        ? "bg-[#FF90BC] text-white"
        : "bg-gray-300 hover:bg-gray-400 text-gray-800"
    } font-bold py-2 px-4 rounded-full`}
  >
    {number}
  </button>
))}
<button
  onClick={goToNextPage}
  disabled={page === nPages}
  className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full"
>
  Next
</button>
</div>
    </>
  );
}

export default Requests;
