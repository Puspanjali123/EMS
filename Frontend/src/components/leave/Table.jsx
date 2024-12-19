import React, { useEffect, useState } from "react";
import axios from "axios";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";
import DataTable from "react-data-table-component";
const Table = () => {
  const [leaves, setLeaves] = useState(null);
  const [filteredLeaves, setFilteredLeaves] = useState(null);
  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          leaveType: leave.leaveType,
          department: leave.employeeId.department.dept_name,
          days:
            new Date(leave.endDate).getDate() -
            new Date(leave.startDate).getDate(),
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));
        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };
  useEffect(() => {
    fetchLeaves();
  }, []);

  const filterByInput = (e) => {
    const data = leaves.filter((leave) =>
      leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredLeaves(data);
  };
  const filterByButton = (status) => {
    const data = leaves.filter((leave) =>
      leave.status.toLowerCase().includes(status.toLowerCase())
    );
    setFilteredLeaves(data);
  };
  return (
    <>
      {filteredLeaves ? (
        <div className="p-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Manage Leaves</h3>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <input
              type="text"
              placeholder="Search"
              onChange={filterByInput}
              className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex space-x-4">
              <button
                onClick={() => filterByButton("Pending")}
                className="px-4 py-2 bg-yellow-500 text-white font-medium rounded-lg shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                Pending
              </button>
              <button
                onClick={() => filterByButton("Approved")}
                className="px-4 py-2 bg-green-500 text-white font-medium rounded-lg shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Approved
              </button>
              <button
                onClick={() => filterByButton("Rejected")}
                className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Rejected
              </button>
            </div>
          </div>
          <div>
            <DataTable columns={columns} data={filteredLeaves} pagination />
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

export default Table;
