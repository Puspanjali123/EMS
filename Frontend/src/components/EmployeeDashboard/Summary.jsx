import React from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../context/authContext";

const Summary = () => {
  const { user } = useAuth();
  return (
    <div className="p-6">
      <div className="flex items-center bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="text-sky-700 text-4xl mr-6 flex-shrink-0">
          <FaUser />
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-700">Welcome Back</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{user.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
