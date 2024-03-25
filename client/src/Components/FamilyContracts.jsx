import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useCookies } from "react-cookie";

function FamilyContracts() {

    const [contracts,setContracts] = useState([]);
    const { headers } = useAuth();
    const [cookies] = useCookies(["token"]);
    const token = cookies.Token;
    const { id } = useParams();
  
    useEffect(() => {
        const fetchTimes = async () => {
          try {
            axios.defaults.headers.common["Authorization"] = token;
            const response = await axios.get(`http://localhost:8080/profile/mycontracts`);
            setContracts(response.data.mycontracts);
            console.log(response.data);
          } catch (error) {
            console.error("Error fetching applications:", error);
          
          }
        };
    
        fetchTimes();
      }, [id]);
  return (
   <>
    <div className="flex flex-col items-center justify-center">
  <h1 className="mt-10 mb-3 text-2xl font-semibold text-[#FF90BC]">
    Contracts
  </h1>
  <div className="overflow-x-auto">
    <div className="max-w-full">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr className="w-full" style={{ width: "100%" }}>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
            >
               Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
            >
              Phone Number
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
            >
              Children Count
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
            >
              Location
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
            >
              start date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
            >
              period
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
            >
              monthly salary
            </th>

          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {contracts &&
            contracts.map((contract, index) => (
              <tr
                key={index}
                className={`w-full ${
                  index % 2 !== 0 ? "bg-white" : "bg-[#FFC0D9]"
                }`}
                style={{ width: "100%" }}
              >
                <td className="px-6 py-4 text-sm h-20 font-medium text-gray-800 dark:text-gray-200 overflow-hidden overflow-ellipsis">
                  {contract.user_name}
                </td>
                <td className="px-6 py-4 text-sm h-20 text-gray-800 dark:text-gray-200 overflow-hidden overflow-ellipsis">
                  {contract.email}
                </td>
                <td className="px-6 py-4 text-sm h-20 text-gray-800 dark:text-gray-200 overflow-hidden overflow-ellipsis">
                  {contract.phonenumber}
                </td>
                <td className="px-6 py-4 text-sm h-20 text-gray-800 dark:text-gray-200 overflow-hidden overflow-ellipsis">
                  {contract.childern_count}
                </td>
                <td className="px-6 py-4 text-sm h-20 text-gray-800 dark:text-gray-200 overflow-hidden overflow-ellipsis">
                  {contract.site}
                </td>
                <td className="px-6 py-4 text-sm h-20 text-gray-800 dark:text-gray-200 overflow-hidden overflow-ellipsis">
                  {contract.start_time}
                </td>
                <td className="px-6 py-4 text-sm h-20 text-gray-800 dark:text-gray-200 overflow-hidden overflow-ellipsis">
                  {contract.period}
                </td>
                <td className="px-6 py-4 text-sm h-20 text-gray-800 dark:text-gray-200 overflow-hidden overflow-ellipsis">
                  {contract.salary}$/monthly
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

   </>
  )
}

export default FamilyContracts