import React from "react";
import { useState } from "react";

const AddExpense = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");

  // Handle button click
  const handleAdd = () => {
    // Validation
    if (!title.trim()) {
      alert("Please enter expense name");
      return;
    }

    // For now just log (later you can send to backend or context)
    console.log({ amount: Number(amount), category });

    // Clear input after adding
    setAmount("");
    setCategory("food");
  };

  return (
    // <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        {/* Expense Card */}
        <div className="bg-white shadow-xl rounded-2xl p-6 w-96 flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-center">Add Expense</h2>

          {/* Amount Input (ONLY NUMBERS) */}
          <input
            className="border p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => {
              // allow only numbers
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setAmount(value);
              }
            }}
          />

          {/* Category */}
          <label className="font-semibold">Category</label>

          <select
            value={category}
            className="border p-2 rounded-xl"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="food">Food</option>
            <option value="bill">Bill</option>
            <option value="shopping">Shopping</option>
          </select>

          {/* Button */}
          <button
            onClick={handleAdd} // ✅ FIX: correct event
            className="bg-amber-400 hover:bg-amber-500 transition-all text-white font-semibold rounded-xl p-2"
          >
            Add
          </button>
        </div>
      </div>
    // </>
  );
};

export default AddExpense;



