import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const LeaveList = () => {
  const [leaves, setLeaves] = useState([]);

  let sno = 1;
  const { id } = useParams();
  const { user } = useAuth();

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/leave/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setLeaves(response.data.leaves);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md space-y-4">
      <div>
        <h3 className="text-2xl font-bold text-gray-800">Manage Leaves</h3>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Search"
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {user.role === "employee" && (
          <Link
            to="/employee-dashboard/add-leave"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition duration-200"
          >
            Add New Leave
          </Link>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300">SNO</th>
              <th className="px-4 py-2 border border-gray-300">Leave Type</th>
              <th className="px-4 py-2 border border-gray-300">From</th>
              <th className="px-4 py-2 border border-gray-300">To</th>
              <th className="px-4 py-2 border border-gray-300">Description</th>

              <th className="px-4 py-2 border border-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave, index) => (
              <tr
                key={leave.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100`}
              >
                <td className="px-4 py-2 border border-gray-300">{sno++}</td>
                <td className="px-4 py-2 border border-gray-300">
                  {leave.leaveType}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {new Date(leave.startDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {new Date(leave.endDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {leave.reason}
                </td>

                <td className="px-4 py-2 border border-gray-300">
                  {leave.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveList;
