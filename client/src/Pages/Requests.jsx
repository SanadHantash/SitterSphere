import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Requests() {
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/family/allrequests?page=${page}&limit=${pageSize}`
        );
        setRequests(response.data.requests);

        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page, pageSize]);

  return (
    <>
      {requests && requests.map ? (
        <div className="flex justify-center mt-32 mb-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {requests.map((request, index) => (
              <a
                key={index}
                className="p-8 max-w-lg border border-[#FF90BC] rounded-2xl hover:shadow-xl hover:shadow-indigo-50 flex flex-col items-center"
                href="#"
              >
                <img
                  src={request.image}
                  className="shadow rounded-lg overflow-hidden w-full h-96 border"
                  alt="Request"
                />
                <div className="mt-8">
                  <h4 className="font-bold text-xl">{request.title}</h4>
                  <h4 className="font-bold text-xl">Children Count:{request.children_count}</h4>
                  <p className="mt-2 text-gray-600">Date: {request.time}</p>
                  <p className="mt-2 text-gray-600">
                    Location: {request.address}
                  </p>
                  <div className="mt-5">
                    <Link to={`/RequestDetail/${request.id}`}>
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md border border-transparent bg-[#FF90BC] px-5 py-4 text-sm font-medium leading-4 text-white shadow-sm hover:bg-[#FFC0D9]"
                      >
                        Read More
                      </button>
                    </Link>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
   <div className="flex justify-center">
        <div className="py-1 px-4">
          <nav className="flex items-center space-x-1">
          
            <button
              type="button"
              onClick={() => setPage(page > 1 ? page - 1 : 1)}
              disabled={page <= 1}
              className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full"
            >
              <span aria-hidden="true">Prev</span>
              <span className="sr-only">Previous</span>
            </button>
            
          
            <div className="flex items-center space-x-2">
              {[...Array(totalPages).keys()].map((pageNum) => (
                <button
                  key={pageNum + 1}
                  onClick={() => setPage(pageNum + 1)}
                  className={`mr-2 ${
                    page === pageNum + 1
                      ? "bg-[#FF90BC] text-white font-bold py-2 px-4 rounded-full"
                      : "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full"
                  }`}
                >
                  {pageNum + 1}
                </button>
              ))}
            </div>
            
            
            <button
              type="button"
              onClick={() => setPage(page + 1)}
              disabled={requests.length < pageSize}
              className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full"
            >
              <span className="sr-only">Next</span>
              <span aria-hidden="true">Next</span>
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Requests;
