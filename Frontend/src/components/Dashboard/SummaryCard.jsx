import React from "react";

const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <div className="flex items-center bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className={`${color} text-4xl mr-6 flex-shrink-0`}>{icon}</div>
      <div>
        <p className="text-lg font-semibold text-gray-700">{text}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{number}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
