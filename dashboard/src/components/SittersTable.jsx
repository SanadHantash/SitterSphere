import React, { useState, useEffect } from "react";
import axios from "axios";
import deletee from "../Assets/delete.png";
import detail from "../Assets/detail.png";
import edit from "../Assets/edit.png";
import attendance from "../Assets/people.png";
import UpdateCourseModal from "../Modals/CourseModal";
import CreateCourse from "../Modals/CreateCourse";
import CourseModal from "../Modals/CourseModal";
import AttendancesModal from "../Modals/AttendancesModal";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

import { useCookies } from "react-cookie";
import Swal from "sweetalert2";

function SittersTable() {
  const [cookies] = useCookies(["token"]);
  const [sitters, setSitters] = useState([]);


  // const [createCourse, setCreatedCourse] = useState({
  //   title: "",
  //   detail: "",
  //   description: "",
  //   trainer: "",
  //   category_id: 0,
  //   is_paid: false,
  //   image: null,
  //   site: "",
  //   start_time: "",
  //   end_time: "",
  // });

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);

  const token = cookies.Token;
  const { headers } = useAuth();
  const [page, setPage] = useState(1); // Current page
  const [limit, setLimit] = useState(5); // Users per page
  

  

  useEffect(() => {
    fetchSitters();
  }, [page, limit]);

  const fetchSitters = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get(
        `http://localhost:8080/dashboard/allsitters?page=${page}&limit=${limit}`
      );

      setSitters(response.data.sitters);
      console.log(response.data.sitters);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const showConfirmationDialog = (faqId) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, proceed!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       deleteCourse(faqId);
  //     }
  //   });
  // };

  // const deleteCourse = async (courseId) => {
  //   try {
  //     axios.defaults.headers.common["Authorization"] = token;
  //     await axios.put(
  //       `http://localhost:8080/dashboard/deletecourse/${courseId}`
  //     );
  //     // Update the courses state after deletion
  //     setCourses(courses.filter((course) => course.id !== courseId));
  //     console.log(`Course ${courseId} deleted successfully.`);
  //   } catch (error) {
  //     console.error(`Error deleting course ${courseId}:`, error);
  //   }
  // };


  const openModal = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
    console.log("Modal is opened");
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCourse(null);
  };

  // const updateCourse = (updatedCourse) => {
  //   const updatedCourses = courses.map((course) =>
  //     course.id === updatedCourse.id ? updatedCourse : course
  //   );

  //   setCourses(updatedCourses);
  // };

  // const addedCourse = (newCourse) => {
  //   setCourses([...courses, newCourse]); // Add the new course to the existing list
  // };
  
  // const attendanceCourse = (selectedCourse) => {
  //   setSelectedCourse(selectedCourse);
  //   setShowAttendanceModal(
  //     (prevShowAttendanceModal) => !prevShowAttendanceModal
  //   );
  // };

  return (
    <>
      {" "}
      <div class="flex flex-col mt-5">
        <hr />
        <h1 className=" mt-3 text-2xl font-semibold text-indigo-950  ">
          Sitters Table
        </h1>

        <div class="-m-1.5 overflow-x-auto">
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
                      value={searchTerm}
                      // onChange={handleSearch}
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
                    className="bg-[#FF90BC] h-10 w-40 text-white  rounded-md ml-2 hover:bg-[#FFC0D9]"
                  >
                    Add BabySitter
                  </button>
                </div>
              </div>
              <div class=" overflow-x-auto">
                <div class="max-w-full">
                  <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead class="bg-gray-50 dark:bg-gray-700">
                      <tr className="w-full" style={{ width: "100%" }}>
                        {/* <th scope="col" class=""></th> */}

                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                        >
                          Name
                        </th>
                        {/* <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                        >
                          Detail
                        </th> */}
                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                        >
                          email
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                        >
                          phonenumber
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                        >
                          Experince level
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                        >
                          Rate
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                        >
                          Image
                        </th>

                        {/* <th
                          scope="col"
                          class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase "
                        >
                          Rate
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                        >
                          Date
                        </th> */}
                        {/* <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                        >
                          End_Time
                        </th> */}
                        <th
                          scope="col"
                          class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase "
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody class=" divide-y divide-gray-200 ">
                      {sitters &&
                        sitters.map((sitter, index) => (
                          <tr
                            key={index}
                            className={`w-full ${
                              index % 2 !== 0 ? "bg-white" : "bg-[#FFC0D9]"
                            }`}
                            style={{ width: "100%" }}
                          >
                            <td class="px-6 py-4  text-sm h-20 font-medium text-gray-800 dark:text-gray-200 overflow-hidden overflow-ellipsis">
                              <Link to={`/details/${sitter.id}`}>
                                {sitter.user_name}{" "}
                              </Link>
                            </td>

                            <td class="px-6 py-4  text-sm h-20 text-gray-800 dark:text-gray-200 overflow-hidden overflow-ellipsis">
                              {sitter.email}
                            </td>
                            <td class="px-6 py-4  text-sm h-20 text-gray-800 dark:text-gray-200 overflow-hidden overflow-ellipsis">
                              {sitter.phonenumber}
                            </td>
                            <td class="px-6 py-4  text-sm h-20 text-gray-800 dark:text-gray-200 overflow-hidden overflow-ellipsis">
                              {sitter.experience_level}
                            </td>
                            <td class="px-6 py-4  text-sm h-20 text-gray-800 dark:text-gray-200 overflow-hidden overflow-ellipsis">
                              {sitter.rate}
                            </td>
                            <td class="px-6 py-4  text-sm h-20 text-gray-800 dark:text-gray-200 overflow-hidden overflow-ellipsis">
                              {sitter.image && (
                                <img
                                  src={sitter.image}
                                  className="h-10 w-10"
                                  alt="course_image"
                                />
                              )}
                            </td>
                            {/* <td class="px-6 py-4 text-sm h-20 text-gray-800 dark:text-gray-200 overflow-hidden overflow-ellipsis">
                              {course.rate}
                            </td>
                            <td class="px-6 py-4 text-sm h-20 text-gray-800 dark:text-gray-200 overflow-hidden overflow-ellipsis">
                              {course.start_time}
                            </td> */}

                            <td class="px-6 py-4 w-1/8 h-20 text-end whitespace-nowrap  text-sm font-medium ">
                              {/* <button
                                type="button"
                                onClick={() => attendanceCourse(course)}
                              >
                                <img
                                  className="h-6 w-6"
                                  src={attendance}
                                  alt=""
                                />
                              </button> */}
                              <button
                                type="button"
                                onClick={() => openModal(sitter)}
                              >
                                <img
                                  className="  h-6 w-6  "
                                  src={edit}
                                  alt=""
                                />
                              </button>
                              {/* <button
                                type="button"
                                onClick={() => showConfirmationDialog(course.id)}
                                className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                              >
                                <img className="h-6 w-6" src={deletee} alt="" />
                              </button> */}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                {/* {showModal && (
                  <CourseModal
                    course={selectedCourse}
                    closeModal={closeModal}
                    updateCourse={updateCourse}
                  />
                )}
                {showCreateModal && (
                  <CreateCourse
                    addcourse={createCourse}
                    closeModal={() => setShowCreateModal(false)}
                    addedCourse={addedCourse} // Pass the addedCourse function
                  />
                )} */}
                {/* {showAttendanceModal && (
                  <AttendancesModal
                    course={selectedCourse}
                    closeModal={() => setShowAttendanceModal(false)}
                    getAttendances={attendanceCourse}
                  />
                )} */}
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
                      { length: Math.ceil(sitters.length / limit) },
                      (_, index) => (
                        <button
                          key={index}
                          onClick={() => setPage(index + 1)}
                          className={`p-2.5 inline-flex items-center rounded-full text-sm font-medium ${
                            page === index + 1
                              ? "bg-[#FF90BC] text-white"
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
                    disabled={sitters.length < limit}
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

export default SittersTable;
