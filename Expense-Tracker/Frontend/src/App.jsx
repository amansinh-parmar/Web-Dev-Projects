import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import AddExpense from "./pages/AddExpense";
import EditExpense from "./pages/EditExpense";
import Statement from "./pages/Statement";
import Setting from "./pages/Setting";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col md:flex-row">
        {/* Sidebar - always visible */}
        <Navbar />

        {/* Main content area */}
        <div className="flex-1">
          {/* ONLY ONE Routes wrapper should be used */}
          <Routes>
            {/* Dashboard route */}
            <Route path="/" element={<Dashboard />} />

            {/* Add Expense page */}
            <Route path="/add-expense" element={<AddExpense />} />

            {/* Edit Expense page */}
            <Route path="/edit-expense/:id" element={<EditExpense />} />

            {/* Statement page */}
            <Route path="/statement" element={<Statement />} />

            {/* Settings page */}
            <Route path="/setting" element={<Setting />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
