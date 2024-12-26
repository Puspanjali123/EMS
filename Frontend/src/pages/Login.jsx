import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password }
      );

      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        console.log(error.response.data.error);
        setError(error.response.data.error);
      } else {
        setError("Server Error");
      }
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Employee Management System
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <h3 className="text-xl font-medium text-gray-800">Login</h3>
          {error && <p className="text-red-500">{error}</p>}
          <div className="relative space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none focus:border-blue-400 text-gray-800"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="*******"
                className="w-full px-4 py-2 pr-10 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none focus:border-blue-400 text-gray-800"
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* <span
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.232 15.232a6 6 0 1 1-8.464-8.464m1.414 1.414a4 4 0 1 0 5.656 5.656m1.414 1.414a6 6 0 1 0-8.464-8.464m1.414 1.414a4 4 0 1 1 5.656 5.656M19.657 19.657a8.1 8.1 0 0 1-11.314 0m1.414 1.414a6 6 0 0 0 8.486-8.486M4.343 4.343a8.1 8.1 0 0 0 0 11.314m1.414-1.414a6 6 0 1 0 8.486-8.486"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5c-6.313 0-8.9 5.305-9 5.5a1.373 1.373 0 0 0 0 1c.1.195 2.687 5.5 9 5.5s8.9-5.305 9-5.5a1.373 1.373 0 0 0 0-1c-.1-.195-2.687-5.5-9-5.5zM12 4.5v0m0 0a3 3 0 1 1-3 3m0 0a3 3 0 1 1 3-3z"
                    />
                  </svg>
                )}
              </span> */}
            </div>
          </div>
          <div className="mb-4 flex items-center justify-between">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-sky-600">
              Forgot password?
            </a>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
