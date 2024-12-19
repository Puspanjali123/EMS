import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    dept_name: "",
    description: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/department/add",
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Add New Department
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="dept_name"
              className="block text-gray-700 font-medium mb-2"
            >
              Department Name
            </label>
            <input
              type="text"
              name="dept_name"
              onChange={handleChange}
              placeholder="Enter Dept Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Description
            </label>
            <textarea
              name="description"
              placeholder="Description"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 focus:ring focus:ring-blue-300 transition duration-200"
          >
            Add Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
