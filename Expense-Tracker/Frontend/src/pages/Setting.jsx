import React, { useState, useEffect } from "react";

const Setting = () => {

  // ================= SETTINGS STATE =================
  const [darkMode, setDarkMode] = useState(false);
  const [currency, setCurrency] = useState("INR");

  // ================= LOAD SAVED SETTINGS =================
  useEffect(() => {
    const savedDark = localStorage.getItem("darkMode");
    const savedCurrency = localStorage.getItem("currency");

    if (savedDark) setDarkMode(JSON.parse(savedDark));
    if (savedCurrency) setCurrency(savedCurrency);
  }, []);

  // ================= SAVE SETTINGS =================
  const saveSettings = () => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    localStorage.setItem("currency", currency);

    alert("Settings saved successfully!");
  };

  // ================= CLEAR ALL EXPENSES =================
  const clearAllExpenses = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete ALL expenses?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch("http://127.0.0.1:5000/clear-expenses", {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed");

      alert("All expenses cleared!");
    } catch (error) {
      console.error(error);
      alert("Failed to clear expenses");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* ================= HEADER ================= */}
      <h1 className="text-3xl font-bold mb-6">
        Settings ⚙️
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        {/* ================= PROFILE CARD ================= */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-bold mb-4">Profile</h2>

          <p className="text-gray-600">Name: User</p>
          <p className="text-gray-600">Email: user@example.com</p>

        </div>

        {/* ================= APP SETTINGS ================= */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-bold mb-4">Preferences</h2>

          {/* DARK MODE */}
          <div className="flex justify-between items-center mb-4">
            <span>Dark Mode</span>

            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="w-5 h-5"
            />
          </div>

          {/* CURRENCY */}
          <div className="mb-4">
            <label className="block mb-2">Currency</label>

            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="INR">INR - ₹</option>
              <option value="USD">USD - $</option>
              <option value="EUR">EUR - €</option>
            </select>
          </div>

          {/* SAVE BUTTON */}
          <button
            onClick={saveSettings}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            Save Settings
          </button>

        </div>

        {/* ================= DANGER ZONE ================= */}
        <div className="bg-white p-6 rounded-xl shadow md:col-span-2">

          <h2 className="text-xl font-bold text-red-600 mb-4">
            Danger Zone
          </h2>

          <p className="text-gray-600 mb-4">
            This action will permanently delete all expenses.
          </p>

          <button
            onClick={clearAllExpenses}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Clear All Expenses
          </button>

        </div>

      </div>
    </div>
  );
};

export default Setting;