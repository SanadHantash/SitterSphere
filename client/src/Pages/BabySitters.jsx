import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function BabySitters() {
  const [sitters, setSitters] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(9);
  const indexOfLastRecord = page * pageSize;
  const indexOfFirstRecord = indexOfLastRecord - pageSize;
  const currentRecords = sitters.slice(indexOfFirstRecord, indexOfLastRecord);

  const nPages = Math.ceil(sitters.length / pageSize);
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
          `http://localhost:8080/sitters?page=${page}&limit=${pageSize}`
        );
        setSitters(response.data.sitters);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
 
      {sitters && currentRecords ? (
        <div className="mt-20 my-8 lg:my-10 lg:mt-20 container px-6 mx-auto md:flex-row items-start md:items-center justify-between pb-4 border-b border-gray-300 ">
          {currentRecords.map((sitter, index) => (
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

export default BabySitters;
