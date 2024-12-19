import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "100px",
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "90px",
  },
  {
    name: "Department",
    selector: (row) => row.dept_name,
    width: "120px",
  },

  {
    name: "Action",
    selector: (row) => row.action,
    center: "true",
  },
];
export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get("http://localhost:3000/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return departments;
};

// employees for salary form

export const getEmployees = async (id) => {
  let employees;
  try {
    const response = await axios.get(
      `http://localhost:3000/api/employee/department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      employees = response.data.employees;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return employees;
};

export const EmployeeeButtons = ({ Id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-4">
      <button
        className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition duration-200"
        onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
      >
        View
      </button>
      <button
        className="px-4 py-2 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300 transition duration-200"
        onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
      >
        Edit
      </button>
      <button
        className="px-4 py-2 bg-yellow-500 text-white font-medium rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-300 transition duration-200"
        onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}
      >
        Salary
      </button>
      <button
        className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 transition duration-200"
        onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}
      >
        Leave
      </button>
    </div>
  );
};
