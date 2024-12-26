import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState();
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchEmployee();
  }, [id]);
  if (!employee) {
    return <p>Loading employee data...</p>;
  }
  return (
    <div className="p-8 bg-gradient-to-br from-gray-100 to-blue-50 rounded-2xl shadow-lg text-gray-800">
      <h2 className="text-3xl font-bold mb-6 border-b-2 border-blue-300 pb-2">
        Employee Details
      </h2>
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-10">
        {/* Profile Image */}
        <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-blue-300 shadow-md">
          <img
            src={`http://localhost:3000/${employee.userId.profileImage}`}
            alt="Employee Profile"
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-2 right-2 bg-green-500 h-4 w-4 rounded-full border-2 border-white"></span>
        </div>
        {/* Employee Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="flex justify-between items-center bg-blue-100 p-4 rounded-lg shadow hover:bg-blue-200 transition duration-300">
            <p className="font-medium text-lg">Name:</p>
            <p className="text-gray-700">{employee.userId.name}</p>
          </div>
          <div className="flex justify-between items-center bg-blue-100 p-4 rounded-lg shadow hover:bg-blue-200 transition duration-300">
            <p className="font-medium text-lg">Employee ID:</p>
            <p className="text-gray-700">{employee.employeeId}</p>
          </div>
          <div className="flex justify-between items-center bg-blue-100 p-4 rounded-lg shadow hover:bg-blue-200 transition duration-300">
            <p className="font-medium text-lg">Date of Birth:</p>
            <p className="text-gray-700">
              {new Date(employee.dob).toISOString().split("T")[0]}
            </p>
          </div>
          <div className="flex justify-between items-center bg-blue-100 p-4 rounded-lg shadow hover:bg-blue-200 transition duration-300">
            <p className="font-medium text-lg">Gender:</p>
            <p className="text-gray-700">{employee.gender}</p>
          </div>
          <div className="flex justify-between items-center bg-blue-100 p-4 rounded-lg shadow hover:bg-blue-200 transition duration-300">
            <p className="font-medium text-lg">Department:</p>
            <p className="text-gray-700">{employee.department.dept_name}</p>
          </div>
          <div className="flex justify-between items-center bg-blue-100 p-4 rounded-lg shadow hover:bg-blue-200 transition duration-300">
            <p className="font-medium text-lg">Marital Status:</p>
            <p className="text-gray-700">{employee.maritalStatus}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
