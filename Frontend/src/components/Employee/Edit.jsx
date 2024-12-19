import React, { useState, useEffect } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const Edit = () => {
  const [employee, setEmployee] = useState({
    name: "",
    maritalStatus: "",
    designation: "",
    salary: 0,
    department: "",
  });
  const [departments, setDepartments] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);
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
          const employee = response.data.employee;
          setEmployee((prev) => ({
            ...prev,
            name: employee.userId.name,
            maritalStatus: employee.maritalStatus,
            designation: employee.designation,
            salary: employee.salary,
            department: employee.department,
          }));
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchEmployee();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmployee((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3000/api/employee/${id}`,
        employee,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };
  return (
    <>
      {departments && employee ? (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">
            Edit Employee
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Employee Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Employee Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={employee.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                />
              </div>

              {/* Email */}

              {/* Employee ID */}

              {/* Gender */}

              {/* Marital Status */}
              <div>
                <label
                  htmlFor="maritalStatus"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Marital Status
                </label>
                <select
                  name="maritalStatus"
                  required
                  onChange={handleChange}
                  value={employee.maritalStatus}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                >
                  <option value="">Select Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                </select>
              </div>

              {/* Designation */}
              <div>
                <label
                  htmlFor="designation"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  onChange={handleChange}
                  value={employee.designation}
                  placeholder="Designation"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                />
              </div>

              {/* Salary */}
              <div>
                <label
                  htmlFor="salary"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Salary
                </label>
                <input
                  type="number"
                  name="salary"
                  onChange={handleChange}
                  value={employee.salary}
                  placeholder="Salary"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                />
              </div>

              {/* Department */}
              <div className="col-span-2">
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Department
                </label>
                <select
                  name="department"
                  onChange={handleChange}
                  value={employee.department}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept._id} value={dept._id}>
                      {dept.dept_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Password */}

              {/* Role */}

              {/* Upload Image */}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300 transition duration-200"
            >
              Edit Employee
            </button>
          </form>
        </div>
      ) : (
        <div>Loading....</div>
      )}
    </>
  );
};

export default Edit;
