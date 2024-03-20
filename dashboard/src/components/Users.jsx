import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../Context/AuthContext";

import { useCookies } from "react-cookie";
function Users() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1); 
  const [limit, setLimit] = useState(5);
  const { headers } = useAuth();
  const [cookies] = useCookies(["token"]);
  const token = cookies.Token;
  useEffect(() => {
    fetchUsers(); 
  }, [page, limit]);

  const fetchUsers = () => {
    axios.defaults.headers.common["Authorization"] = token;
    axios
      .get(
        `http://localhost:8080/dashboard/allusers?page=${page}&limit=${limit}`
      )
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  console.log(users);
  const updateUser = (updatedUserData) => {
    const updatedUsers = users.map((u) =>
      u.id === updatedUserData.id ? updatedUserData : u
    );
    setUsers(updatedUsers);
  };

  const showConfirmationDialog = (userId, isDeleted) => {
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
        toggleBlockUser(userId, isDeleted);
      }
    });
  };
  const toggleBlockUser = async (userId, isDeleted) => {
    try {
      console.log("Toggling user block status for user ID:", userId);
      console.log("Is Deleted:", isDeleted);
  
      const updatedUserData = { ...users.find((user) => user.id === userId) };
      updatedUserData.is_deleted = !isDeleted;
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.put(
        `http://localhost:8080/dashboard/deleteuser/${userId}`,
        updatedUserData
      );
  
      if (response.status === 200) {
        const updatedUsers = users.map((user) =>
          user.id === userId ? updatedUserData : user
        );
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.error("Error toggling user block status: ", error);
    }
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredUsers = users.filter((user) => {
    const {
      first_name = "",
      last_name = "",
      user_name = "",
      email = "",
      phonenumber = "",
    } = user || {};

    const searchTermLower = searchTerm.toLowerCase();

    return (
      first_name?.toLowerCase().includes(searchTermLower) ||
      last_name?.toLowerCase().includes(searchTermLower) ||
      user_name?.toLowerCase().includes(searchTermLower) ||
      email?.toLowerCase().includes(searchTermLower) ||
      phonenumber?.toLowerCase().includes(searchTermLower)
    );
  });

  const openModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  return (
    <div class="flex flex-col">
      <h1 className=" mt-3 text-2xl font-semibold text-indigo-950  ">
        Users Table
      </h1>
      <div class="-m-1.5 overflow-x-auto">
        <div class="p-1.5 min-w-full inline-block align-middle">
          <div class="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
            <div class="py-3 px-4">
              <div class="relative max-w-xs">
                <label class="sr-only">Search</label>
                <input
                  type="text"
                  name="hs-table-with-pagination-search"
                  id="hs-table-with-pagination-search"
                  value={searchTerm}
                  onChange={handleSearch}
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
            </div>
            <div class="overflow-hidden">
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
                      First Name
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Last Name
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Username
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      PhoneNumber
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Role
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
                  {filteredUsers.map((user, index) => (
                    <tr
                      key={index}
                      className={index % 2 !== 0 ? "bg-white" : "bg-[#FFC0D9]"}
                    >
                      <td class="py-3 ps-4">
                        <div class="flex items-center h-5"></div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                        {user.first_name}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        {user.last_name}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        {user.user_name}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        {user.email}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        {user.phonenumber}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        {user.role}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                        <button
                          type="button"
                          onClick={() =>
                            showConfirmationDialog(user.id, user.is_deleted)
                          }
                          className={`justify-center inline-flex w-20 bg-[#FF90BC] items-center text-sm font-semibold rounded-lg border border-transparent text-white ${
                            user.is_deleted ? "bg-red-800" : "bg-[#FF90BC]"
                          } disabled:opacity-50 disabled:pointer-events-none`}
                        >
                          {user.is_deleted ? "Unblock" : "Block"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                    { length: Math.ceil(users.length / limit) },
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
                  disabled={users.length < limit}
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
  );
}

export default Users;
