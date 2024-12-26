import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import PrivateRoutes from "./utils/PrivateRoutes";
import AdminSummary from "./components/Dashboard/AdminSummary";
import DepartmentList from "./components/Department/DepartmentList";
import AddDepartment from "./components/Department/AddDepartment";
import EditDepartment from "./components/Department/EditDepartment";
import List from "./components/Employee/List";
import Add from "./components/Employee/Add";
import AddSalary from "./components/Salary/AddSalary";
import View from "./components/Employee/View";
import Edit from "./components/Employee/Edit";
import ViewSalary from "./components/Salary/ViewSalary";
import Summary from "./components/EmployeeDashboard/Summary";
import LeaveList from "./components/leave/LeaveList";
import AddLeave from "./components/leave/AddLeave";
import Setting from "./components/EmployeeDashboard/Setting";
import Table from "./components/leave/Table";
import Detail from "./components/leave/Detail";
import AuthContext from "./context/authContext";
import LeaveCalender from "./components/Calender/LeaveCalender";

function App() {
  return (
    <AuthContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoutes>
                <RoleBaseRoutes requiredRole={["admin"]}>
                  <AdminDashboard />
                </RoleBaseRoutes>
              </PrivateRoutes>
            }
          >
            <Route index element={<AdminSummary />}></Route>
            <Route
              path="/admin-dashboard/departments"
              element={<DepartmentList />}
            ></Route>
            <Route
              path="/admin-dashboard/add-department"
              element={<AddDepartment />}
            ></Route>
            <Route
              path="/admin-dashboard/department/:id"
              element={<EditDepartment />}
            ></Route>
            <Route path="/admin-dashboard/employees" element={<List />}></Route>
            <Route
              path="/admin-dashboard/add-employee"
              element={<Add />}
            ></Route>
            <Route
              path="/admin-dashboard/employees/:id"
              element={<View />}
            ></Route>
            <Route
              path="/admin-dashboard/employees/edit/:id"
              element={<Edit />}
            ></Route>
            <Route
              path="/admin-dashboard/employees/salary/:id"
              element={<ViewSalary />}
            ></Route>
            <Route
              path="/admin-dashboard/salary/add"
              element={<AddSalary />}
            ></Route>

            <Route path="/admin-dashboard/leaves" element={<Table />}></Route>
            <Route
              path="/admin-dashboard/leave-details/:id"
              element={<Detail />}
            ></Route>
            <Route
              path="/admin-dashboard/employees/leaves/:id"
              element={<LeaveList />}
            ></Route>

            <Route
              path="/admin-dashboard/Calender"
              element={<LeaveCalender />}
            ></Route>

            <Route
              path="/admin-dashboard/setting"
              element={<Setting />}
            ></Route>
          </Route>
          <Route
            path="/employee-dashboard"
            element={
              <PrivateRoutes>
                <RoleBaseRoutes requiredRole={["admin", "employee"]}>
                  <EmployeeDashboard />
                </RoleBaseRoutes>
              </PrivateRoutes>
            }
          >
            <Route index element={<Summary />}></Route>
            <Route
              path="/employee-dashboard/profile/:id"
              element={<View />}
            ></Route>
            <Route
              path="/employee-dashboard/leaves/:id"
              element={<LeaveList />}
            ></Route>
            <Route
              path="/employee-dashboard/add-leave"
              element={<AddLeave />}
            ></Route>
            <Route
              path="/employee-dashboard/salary/:id"
              element={<ViewSalary />}
            ></Route>
            <Route
              path="/employee-dashboard/setting"
              element={<Setting />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext>
  );
}

export default App;
