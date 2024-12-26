import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaMoneyBillWave,
  FaUsers,
} from "react-icons/fa";
import axios from "axios";

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary = await axios.get(
          "http://localhost:3000/api/dashboard/summary",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSummary(summary.data);
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error);
        }
        console.log(error.message);
      }
    };
    fetchSummary();
  }, []);

  if (!summary) {
    return <div>Loading ...</div>;
  }
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        Dashboard Overview
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <SummaryCard
          icon={<FaUsers />}
          text="Total Employees"
          number={summary?.totalEmployees}
          color="text-blue-600"
        />
        <SummaryCard
          icon={<FaBuilding />}
          text="Total Department"
          number={summary?.totalDepartments}
          color="text-yellow-600"
        />
      </div>
      <div className="mt-12">
        <h4 className="text-center text-2xl font-bold">Leave Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <SummaryCard
            icon={<FaFileAlt />}
            text="Leave Applied"
            number={summary?.leaveSummary.appliedFor}
            color="text-blue-600"
          />
          <SummaryCard
            icon={<FaCheckCircle />}
            text="Leave Approved"
            number={summary?.leaveSummary.approved}
            color="text-blue-600"
          />
          <SummaryCard
            icon={<FaFileAlt />}
            text="Leave Pending"
            number={summary?.leaveSummary.pending}
            color="text-blue-600"
          />
          <SummaryCard
            icon={<FaFileAlt />}
            text="Leave Rejected"
            number={summary?.leaveSummary.rejected}
            color="text-blue-600"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
