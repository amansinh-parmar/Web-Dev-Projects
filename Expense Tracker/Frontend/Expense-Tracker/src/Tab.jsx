import React from "react";
import { Link } from "react-router-dom";
import { FaWallet } from "react-icons/fa";

const Tab = () => {
  return (
    <div className="bg-blue-500 text-white w-64 h-screen flex flex-col p-5">
      
      <h2 className="text-2xl font-extrabold tracking-widest mt-20 mb-10 flex gap-5 items-center">
        <FaWallet />
        Expense Tracker
      </h2>

      {/* Add Expense Button */}
      <Link to="/add-expense">
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-all duration-200 mb-5 mt-20 w-full">
          Add Expense
        </button>
      </Link>

      {/* Navigation Menu */}
      <ul className="flex flex-col mt-20 gap-7 font-bold">

        <Link to="/">
          <li className="p-3 text-center rounded-lg hover:bg-blue-700 cursor-pointer transition-all duration-200">
            Dashboard
          </li>
        </Link>

        <Link to="/edit-expense">
          <li className="p-3 text-center rounded-lg hover:bg-blue-700 cursor-pointer transition-all duration-200">
            Edit
          </li>
        </Link>

        <li className="p-2 text-center rounded hover:bg-blue-700 cursor-pointer">
          Setting
        </li>

      </ul>
    </div>
  );
};

export default Tab;