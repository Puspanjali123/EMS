import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";
const AdminSidebar = () => {
  return (
    <div className="flex flex-col  bg-gray-800 text-white w-64 h-screen">
      <div className="flex items-center justify-center p-4 bg-sky-700">
        <h3 className="text-2xl font-semibold text-gray-200">Employee MS</h3>
      </div>
      <div className="flex flex-col space-y-4 mt-6 px-4">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `${
              isActive ? "bg-slate-500 rounded-lg" : " "
            } flex items-center space-x-4  text-lg font-medium text-gray-300 hover:text-white hover:bg-gray-700 py-2 px-3  transition duration-200`
          }
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/employees"
          className={({ isActive }) =>
            `${
              isActive ? "bg-slate-500 rounded-lg" : " "
            } flex items-center space-x-4  text-lg font-medium text-gray-300 hover:text-white hover:bg-gray-700 py-2 px-3  transition duration-200`
          }
          end
        >
          <FaUsers className="text-xl" />
          <span>Employee</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/departments"
          className={({ isActive }) =>
            `${
              isActive ? "bg-slate-500 rounded-lg" : " "
            } flex items-center space-x-4  text-lg font-medium text-gray-300 hover:text-white hover:bg-gray-700 py-2 px-3  transition duration-200`
          }
          end
        >
          <FaBuilding className="text-xl" />
          <span>Department</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/leaves"
          className={({ isActive }) =>
            `${
              isActive ? "bg-slate-500 rounded-lg" : " "
            } flex items-center space-x-4  text-lg font-medium text-gray-300 hover:text-white hover:bg-gray-700 py-2 px-3  transition duration-200`
          }
          end
        >
          <FaCalendarAlt className="text-xl" />
          <span>Leave</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/salary/add"
          className={({ isActive }) =>
            `${
              isActive ? "bg-slate-500 rounded-lg" : " "
            } flex items-center space-x-4  text-lg font-medium text-gray-300 hover:text-white hover:bg-gray-700 py-2 px-3  transition duration-200`
          }
          end
        >
          <FaMoneyBillWave className="text-xl" />
          <span>Salary</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/setting"
          className={({ isActive }) =>
            `${
              isActive ? "bg-slate-500 rounded-lg" : " "
            } flex items-center space-x-4  text-lg font-medium text-gray-300 hover:text-white hover:bg-gray-700 py-2 px-3  transition duration-200`
          }
          end
        >
          <FaCogs className="text-xl" />
          <span>Setting</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
