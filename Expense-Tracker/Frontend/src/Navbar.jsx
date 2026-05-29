import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaWallet, FaPlus, FaChartPie, FaFileAlt, FaCog } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation(); // detect active route

  // ================= ACTIVE LINK STYLE =================
  const isActive = (path) => location.pathname === path;

  return (
    // <div className="w-64 min-h-screen bg-gradient-to-b from-indigo-700 via-blue-700 to-blue-900 text-white flex flex-col p-5 shadow-xl">
    <div className="w-full md:w-64 md:min-h-screen bg-gradient-to-b from-indigo-700 via-blue-700 to-blue-900 text-white flex md:flex-col flex-row p-3 md:p-5 shadow-xl">
      {/* ================= BRAND ================= */}
      <h2 className="text-2xl font-extrabold flex items-center gap-3 mb-10 mt-4">
        <FaWallet className="text-emerald-300" />
        Expense Tracker
      </h2>

      {/* ================= ADD BUTTON ================= */}
      <Link to="/add-expense">
        <button className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 py-2 rounded-xl font-semibold transition">
          <FaPlus />
          Add Expense
        </button>
      </Link>

      {/* ================= MENU ================= */}
      {/* <ul className="flex flex-col gap-3 mt-8 font-medium"> */}
      <ul className="flex md:flex-col flex-row gap-2 md:gap-3 mt-0 md:mt-8 overflow-x-auto">
        {/* DASHBOARD */}
        <Link to="/">
          <li
            className={`flex items-center gap-2 p-3 rounded-lg transition cursor-pointer ${
              isActive("/")
                ? "bg-white text-blue-700 font-bold"
                : "hover:bg-blue-600"
            }`}
          >
            <FaChartPie />
            Dashboard
          </li>
        </Link>

        {/* STATEMENT */}
        <Link to="/statement">
          <li
            className={`flex items-center gap-2 p-3 rounded-lg transition cursor-pointer ${
              isActive("/statement")
                ? "bg-white text-blue-700 font-bold"
                : "hover:bg-blue-600"
            }`}
          >
            <FaFileAlt />
            Statement
          </li>
        </Link>

        {/* SETTINGS */}
        <Link to="/setting">
          <li
            className={`flex items-center gap-2 p-3 rounded-lg transition cursor-pointer ${
              isActive("/setting")
                ? "bg-white text-blue-700 font-bold"
                : "hover:bg-blue-600"
            }`}
          >
            <FaCog />
            Setting
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
