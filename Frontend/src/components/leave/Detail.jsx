import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchLeave();
  }, []);

  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/leave/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/leaves");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };
  return (
    <>
      {leave ? (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-4 mb-6">
            Leave Details
          </h2>
          <div className="flex items-start space-x-6">
            <div className="w-32 h-32">
              <img
                src={`http://localhost:3000/${leave.employeeId.userId.profileImage}`}
                alt="Employee"
                className="w-full h-full object-cover rounded-full border border-gray-300"
              />
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name:</p>
                <p className="text-lg font-medium text-gray-800">
                  {leave.employeeId.userId.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Employee ID:</p>
                <p className="text-lg font-medium text-gray-800">
                  {leave.employeeId.employeeId}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Leave Type:</p>
                <p className="text-lg font-medium text-gray-800">
                  {leave.leaveType}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Reason:</p>
                <p className="text-lg font-medium text-gray-800">
                  {leave.reason}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Department:</p>
                <p className="text-lg font-medium text-gray-800">
                  {leave.employeeId.department.dept_name}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Start Date:</p>
                <p className="text-lg font-medium text-gray-800">
                  {new Date(leave.startDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">End Date:</p>
                <p className="text-lg font-medium text-gray-800">
                  {new Date(leave.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">
                  {leave.status === "Pending" ? "Action" : "Status"}:
                </p>
                {leave.status === "Pending" ? (
                  <div className="mt-2 flex space-x-4">
                    <button
                      onClick={() => changeStatus(leave._id, "Approved")}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => changeStatus(leave._id, "Rejected")}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <p
                    className={`text-lg font-medium ${
                      leave.status === "Approved"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {leave.status}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      )}
    </>
  );
};

export default Detail;
