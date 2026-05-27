import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tab from "./Tab";
import AddExpense from "./pages/AddExpense";
import Setting from "./pages/Setting";

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        {/* Sidebar */}
        <Tab />

        {/* Main content area */}
        <div className="flex-1">
          <Routes>
            <Route path="/add-expense" element={<AddExpense />} />
          </Routes>

          <Routes>
            <Route path="/setting" element={<Setting />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
