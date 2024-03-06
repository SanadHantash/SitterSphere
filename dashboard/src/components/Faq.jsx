import React, { useState, useEffect } from "react";
import axios from "axios";
import deletee from "../Assets/delete.png";
import edit from "../Assets/edit.png";
import ReplyModal from "../Modals/ReplayModal";
import FaqModal from "../Modals/FaqModal";
import Swal from "sweetalert2";import { useAuth } from "../Context/AuthContext";

import { useCookies } from "react-cookie";


function Faq() {
  const [Faqs, setFaqs] = useState([]);
  const [createdFaq, setCreatedFaq] = useState({
    question: "",
    answer: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const { headers } = useAuth();
  const [cookies] = useCookies(["token"]);
  const token = cookies.Token;

  useEffect(() => {
    fetchFaq();
  }, [page, limit]);

  const fetchFaq = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get(
        `http://localhost:8080/dashboard/allfaq?page=${page}&limit=${limit}`
      );

      setFaqs(response.data.question);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const showConfirmationDialog = (faqId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFaq(faqId);
      }
    });
  };

  const deleteFaq = async (faqId) => {
    try {
      if (!faqId) {
        console.error("Invalid FAQ ID");
        return;
      }

      axios.defaults.headers.common["Authorization"] = token;
      await axios.put(`http://localhost:8080/dashboard/faq/${faqId}/delete`);

      setFaqs((prevFaqs) => prevFaqs.filter((faq) => faq.id !== faqId));
      console.log(`FAQ ${faqId} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting FAQ ${faqId}:`, error);
    }
  };

  const openModal = (faq) => {
    setSelectedFaq(faq);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedFaq(null);
  };

  const updateFaq = (updatedFaqData) => {
    const updatedFaqs = Faqs.map((faq) =>
      faq.id === updatedFaqData.id ? updatedFaqData : faq
    );
    setFaqs(updatedFaqs);
  };
  return (
    <>
      <div class="flex flex-col mt-5">
        <hr />
        <h1 className=" mt-3 text-2xl font-semibold text-indigo-950  ">
          FAQs Table
        </h1>

        <div class="-m-1.5 overflow-x-auto ">
          <div class="p-1.5 min-w-full inline-block align-middle">
            <div class="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
              <div class="flex justify-between items-center py-3 px-4">
                <div className="flex flex-wrap justify-between w-full">
                  <div class="relative max-w-xs flex flex-col items-start">
                    <label class="sr-only">Search</label>
                    <input
                      type="text"
                      name="hs-table-with-pagination-search"
                      id="hs-table-with-pagination-search"
                      class="py-2 px-3 ps-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      placeholder="Search for items"
                    />
                    <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                      <svg
                        class="h-4 w-4 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                      </svg>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-indigo-950 h-10 w-40 text-white  rounded-md ml-2 hover:bg-indigo-900"
                  >
                    Create FAQ
                  </button>
                </div>
              </div>
              <div class=" overflow-x-auto">
                <div class="max-w-full">
                  <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead class="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" class="py-3 px-4 pe-0">
                          <div class="flex items-center h-5"></div>
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                        >
                          Question
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                        >
                          Answer
                        </th>

                        <th
                          scope="col"
                          class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                      {Array.isArray(Faqs) &&
                        Faqs.length > 0 &&
                        Faqs.map((faq, index) => (
                          <tr
                            key={index}
                            className={
                              index % 2 !== 0 ? "bg-white" : "bg-[#d5c5df]"
                            }
                          >
                            <td class="py-3 ps-4">
                              <div class="flex items-center h-5"></div>
                            </td>
                            <td class="px-6 py-4  text-sm font-medium text-gray-800 dark:text-gray-200">
                              {faq.question}
                            </td>
                            <td class="px-6 py-4  text-sm text-gray-800 dark:text-gray-200">
                              {faq.answer}
                            </td>

                            <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                              <button
                                type="button"
                                onClick={() => openModal(faq)}
                                class="inline-flex mr-2 items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                              >
                                <img className="  h-6 w-6 " src={edit} alt="" />
                              </button>
                              <button
                                type="button"
                                onClick={() => showConfirmationDialog(faq.id)}
                                className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                              >
                                <img className="h-6 w-6" src={deletee} alt="" />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                {showModal && (
                  <FaqModal
                    faq={selectedFaq}
                    closeModal={closeModal}
                    updateFaq={updateFaq}
                  />
                )}
                {showCreateModal && (
                  <ReplyModal
                    closeModal={() => setShowCreateModal(false)}
                    onUpdateAnswer={(newFaq) => {
                      setCreatedFaq(newFaq);
                      setShowCreateModal(false);
                      // Call fetchFaq to refresh the list from the server
                      fetchFaq();
                    }}
                  />
                )}
              </div>
              <div class="py-1 px-4">
                <nav class="flex items-center space-x-1">
                  <button
                    type="button"
                    onClick={() => setPage(page > 1 ? page - 1 : 1)}
                    disabled={page <= 1}
                    className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    <span aria-hidden="true">«</span>
                    <span className="sr-only">Previous</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    {Array.from(
                      { length: Math.ceil(Faqs.length / limit) },
                      (_, index) => (
                        <button
                          key={index}
                          onClick={() => setPage(index + 1)}
                          className={`p-2.5 inline-flex items-center rounded-full text-sm font-medium ${
                            page === index + 1
                              ? " text-indigo-950"
                              : "text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-white/10"
                          }`}
                        >
                          {index + 1}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setPage(page + 1)}
                    disabled={Faqs.length < limit}
                    className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    <span className="sr-only">Next</span>
                    <span aria-hidden="true">»</span>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Faq;
