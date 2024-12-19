import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const ViewSalary = () => {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState(null);
  const { id } = useParams();
  let sno = 1;
  const { user } = useAuth();

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/salary/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const filterSalaries = (event) => {
    const query = event.target.value;
    const filteredRecords = salaries.filter((leave) =>
      leave.employeeId.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSalaries(filteredRecords);
  };

  return (
    <>
      {filteredSalaries === null ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-lg font-medium text-gray-600">Loading ...</div>
        </div>
      ) : (
        <div className="p-6 bg-white rounded-lg shadow-md max-w-6xl mx-auto space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-800">Salary History</h2>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search By Emp ID"
              onChange={filterSalaries}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {filteredSalaries.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border border-gray-300">SNO</th>
                    <th className="px-4 py-2 border border-gray-300">Emp ID</th>
                    <th className="px-4 py-2 border border-gray-300">Salary</th>
                    <th className="px-4 py-2 border border-gray-300">
                      Allowance
                    </th>
                    <th className="px-4 py-2 border border-gray-300">
                      Deduction
                    </th>
                    <th className="px-4 py-2 border border-gray-300">Total</th>
                    <th className="px-4 py-2 border border-gray-300">
                      Pay Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSalaries.map((salary, index) => (
                    <tr
                      key={salary.id}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100`}
                    >
                      <td className="px-4 py-2 border border-gray-300">
                        {sno++}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {salary.employeeId.employeeId}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {salary.basicSalary}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {salary.allowances}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {salary.deductions}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {salary.netSalary}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {new Date(salary.payDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-lg font-medium text-gray-500">
              No Records
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ViewSalary;
