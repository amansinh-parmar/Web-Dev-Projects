import React, { useState } from "react";

const AddExpense = () => {

  // ================= FORM STATE =================
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    note: "",
  });

  const [loading, setLoading] = useState(false);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  // ================= SUBMIT EXPENSE =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // disable button while saving

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/add-expense",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(expense),
        }
      );

      const data = await response.json();

      alert(data.message || "Expense added successfully!");

      // Reset form after success
      setExpense({
        title: "",
        amount: "",
        category: "",
        date: "",
        note: "",
      });

    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-gray-100 p-4">

      {/* ================= EXPENSE CARD ================= */}
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-6 md:p-8">

        {/* HEADER */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-blue-900">
            Add Expense
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Track your daily spending easily
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* TITLE */}
          <input
            type="text"
            name="title"
            value={expense.title}
            onChange={handleChange}
            placeholder="Expense title"
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          {/* AMOUNT */}
          <input
            type="number"
            name="amount"
            value={expense.amount}
            onChange={handleChange}
            placeholder="Amount"
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          {/* CATEGORY */}
          <select
            name="category"
            value={expense.category}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Shopping">Shopping</option>
            <option value="Travel">Travel</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Health">Health</option>
            <option value="Other">Other</option>
          </select>

          {/* DATE */}
          <input
            type="date"
            name="date"
            value={expense.date}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          {/* NOTE */}
          <textarea
            name="note"
            value={expense.note}
            onChange={handleChange}
            placeholder="Add note (optional)"
            rows="3"
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* BUTTONS */}
          <div className="flex gap-3 pt-2">

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-3 rounded-xl font-semibold text-white transition ${
                loading
                  ? "bg-blue-300"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Adding..." : "Add Expense"}
            </button>

            {/* CLEAR */}
            <button
              type="button"
              onClick={() =>
                setExpense({
                  title: "",
                  amount: "",
                  category: "",
                  date: "",
                  note: "",
                })
              }
              className="px-4 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 font-medium"
            >
              Clear
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default AddExpense;