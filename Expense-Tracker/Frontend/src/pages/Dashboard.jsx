import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ================= FETCH EXPENSES =================
  const fetchExpenses = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/expenses");
      const data = await res.json();

      setExpenses(data);
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // ================= DELETE EXPENSE =================
  const handleDelete = async (id) => {
    try {
      console.log("Deleting ID:", id); // 🔥 check ID in console

      const res = await fetch(`http://127.0.0.1:5000/expenses/${id}`, {
        method: "DELETE",
      });

      console.log("Response status:", res.status); // 🔥 debug backend response

      const data = await res.text(); // 🔥 read backend response
      console.log("Backend response:", data);

      if (!res.ok) {
        throw new Error(`Delete failed: ${res.status}`);
      }

      // update UI instantly
      setExpenses((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete failed. Check backend console.");
    }
  };

  // ================= EDIT EXPENSE =================
  const handleEdit = (id) => {
    // Navigate to EditExpense page with ID
    navigate(`/edit-expense/${id}`);
  };

  // ================= TOTAL =================
  const totalSpent = expenses.reduce(
    (sum, item) => sum + Number(item.amount),
    0,
  );

  // ================= CATEGORY DATA =================
  const categoryMap = expenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + Number(item.amount);
    return acc;
  }, {});

  const categoryData = Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ["#6366F1", "#22C55E", "#F59E0B", "#EF4444", "#06B6D4"];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6">Expense Dashboard</h1>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* TOTAL */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500">Total Spent</h2>
          <p className="text-3xl font-bold text-red-500">₹{totalSpent}</p>
        </div>

        {/* CATEGORY */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500">Category Summary</h2>

          {Object.entries(categoryMap).map(([cat, val]) => (
            <div key={cat} className="flex justify-between border-b py-1">
              <span>{cat}</span>
              <span>₹{val}</span>
            </div>
          ))}
        </div>

        {/* CHART */}
        <div className="bg-white p-5 rounded-xl shadow">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={70}
              >
                {categoryData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* EXPENSE LIST */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Recent Expenses</h2>

        {loading ? (
          <p>Loading...</p>
        ) : expenses.length === 0 ? (
          <p>No expenses found</p>
        ) : (
          expenses.map((item) => (
            <div key={item.id} className="flex justify-between border-b py-3">
              {/* LEFT */}
              <div>
                <p className="font-bold">{item.title}</p>
                <p className="text-sm text-gray-500">{item.category}</p>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-3">
                <p className="text-red-500 font-bold">₹{item.amount}</p>

                {/* EDIT BUTTON */}
                <button
                  onClick={() => handleEdit(item.id)}
                  className="text-blue-500 text-sm"
                >
                  Edit
                </button>

                {/* DELETE BUTTON */}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
