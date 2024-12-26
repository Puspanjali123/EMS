import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import DataTable from "react-data-table-component";
import axios from "axios";
import { columns, EmployeeeButtons } from "../../utils/EmployeeHelper";
const List = () => {
  const [employees, setEmployees] = useState();
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployee, setFilteredEmployees] = useState([]);
  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          let sno = 1;
          const data = await response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dept_name: emp.department.dept_name,
            name: emp.userId.name,
            dob: emp.dob,
            profileImage: (
              <img src={`http://localhost:3000/${emp.userId.profileImage}`} />
            ),
            action: <EmployeeeButtons Id={emp._id} />,
          }));
          setEmployees(data);
          setFilteredEmployees(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployees(records);
  };
  return (
    <div className="p-6">
      <div className="mb-4">
        <h3 className="text-2xl text-center font-bold text-gray-800">
          Manage Employees
        </h3>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 shadow-md rounded-lg">
        <input
          type="text"
          placeholder="Search"
          className="w-full sm:w-auto mb-4 sm:mb-0 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none"
          onChange={handleFilter}
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 focus:ring focus:ring-blue-300 transition duration-200"
        >
          Add New Employee
        </Link>
      </div>
      <div>
        <DataTable columns={columns} data={filteredEmployee} pagination />
      </div>
    </div>
  );
};

export default List;
