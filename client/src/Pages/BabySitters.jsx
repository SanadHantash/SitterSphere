import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function BabySitters() {
  const [sitters, setSitters] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(9);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/sitters?page=${page}&limit=${pageSize}`
        );
        console.log("Response data:", response.data);
        setSitters(response.data.sitters);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page, pageSize]);

  return (
    <>
      {sitters && sitters.map ? (
        <div className="mt-20 my-8 lg:my-10 lg:mt-20 container px-6 mx-auto md:flex-row items-start md:items-center justify-between pb-4 border-b border-gray-300 ">
          {sitters.map((sitter, index) => (
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
              disabled={sitters.length < pageSize}
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

export default BabySitters;
