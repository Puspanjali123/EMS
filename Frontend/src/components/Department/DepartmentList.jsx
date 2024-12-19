import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";
const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const onDepartmentDelete = async () => {
    fetchDepartments();
  };

  const fetchDepartments = async () => {
    setDepLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/department", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.departments.map((dept) => ({
          _id: dept._id,
          sno: sno++,
          dept_name: dept.dept_name,
          action: (
            <DepartmentButtons
              _id={dept._id}
              onDepartmentDelete={onDepartmentDelete}
            />
          ),
        }));
        setDepartments(data);
        setFilteredDepartments(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setDepLoading(false);
    }
  };
  useEffect(() => {
    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const records = departments.filter((dept) =>
      dept.dept_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredDepartments(records);
  };
  return (
    <>
      {depLoading ? (
        <div>Loading ...</div>
      ) : (
        <div className="p-6 bg-gray-100">
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-gray-800">
              Manage Departments
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 shadow-md rounded-lg">
            <input
              type="text"
              placeholder="Search"
              className="w-full sm:w-auto mb-4 sm:mb-0 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none"
              onChange={filterDepartments}
            />
            <Link
              to="/admin-dashboard/add-department"
              className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 focus:ring focus:ring-blue-300 transition duration-200"
            >
              Add Departments
            </Link>
          </div>
          <div className="mt-5">
            <DataTable
              columns={columns}
              data={filteredDepartments}
              pagination
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;
