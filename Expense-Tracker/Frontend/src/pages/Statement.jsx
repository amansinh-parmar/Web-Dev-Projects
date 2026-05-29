import React, { useEffect, useState, useMemo } from "react";

const Statement = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");

  // ================= FETCH =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/expenses");
        const data = await res.json();
        setExpenses(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ================= FILTERED DATA =================
  const filteredExpenses = useMemo(() => {
    return expenses
      .filter((item) => {
        const date = new Date(item.date);
        const start = fromDate ? new Date(fromDate) : null;
        const end = toDate ? new Date(toDate) : null;

        const matchesDate =
          (!start || date >= start) && (!end || date <= end);

        const matchesSearch =
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
          !category || item.category === category;

        return matchesDate && matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === "date-desc")
          return new Date(b.date) - new Date(a.date);
        if (sortBy === "date-asc")
          return new Date(a.date) - new Date(b.date);
        if (sortBy === "amount-desc")
          return b.amount - a.amount;
        if (sortBy === "amount-asc")
          return a.amount - b.amount;
        return 0;
      });
  }, [expenses, fromDate, toDate, search, category, sortBy]);

  // ================= SUMMARY =================
  const totalSpent = filteredExpenses.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const avgSpent =
    filteredExpenses.length > 0
      ? totalSpent / filteredExpenses.length
      : 0;

  const highestExpense = Math.max(
    ...filteredExpenses.map((i) => Number(i.amount)),
    0
  );

  // ================= CATEGORY BREAKDOWN =================
  const categoryMap = filteredExpenses.reduce((acc, item) => {
    acc[item.category] =
      (acc[item.category] || 0) + Number(item.amount);
    return acc;
  }, {});

  const categories = [...new Set(expenses.map((e) => e.category))];

  // ================= EXPORT CSV =================
  const exportCSV = () => {
    const headers = ["Title", "Category", "Amount", "Date", "Note"];

    const rows = filteredExpenses.map((e) => [
      e.title,
      e.category,
      e.amount,
      e.date,
      e.note || "",
    ]);

    const csvContent =
      [headers, ...rows]
        .map((row) => row.join(","))
        .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses.csv";
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-900">
          Expense Statement
        </h1>

        <button
          onClick={exportCSV}
          className="bg-green-600 text-white px-4 py-2 rounded-xl"
        >
          Export CSV
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Total Spent</p>
          <h2 className="text-2xl font-bold text-red-500">
            ₹{totalSpent}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Average Expense</p>
          <h2 className="text-2xl font-bold text-blue-600">
            ₹{avgSpent.toFixed(2)}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Highest Expense</p>
          <h2 className="text-2xl font-bold text-purple-600">
            ₹{highestExpense}
          </h2>
        </div>

      </div>

      {/* FILTERS */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 grid grid-cols-1 md:grid-cols-5 gap-3">

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Search title/category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="amount-desc">High Amount</option>
          <option value="amount-asc">Low Amount</option>
        </select>

      </div>

      {/* CATEGORY SUMMARY */}
      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <h2 className="font-bold mb-3">Category Breakdown</h2>

        {Object.entries(categoryMap).map(([cat, val]) => (
          <div key={cat} className="flex justify-between border-b py-2">
            <span>{cat}</span>
            <span className="font-bold text-blue-600">
              ₹{val}
            </span>
          </div>
        ))}
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        {loading ? (
          <p className="p-6 text-center">Loading...</p>
        ) : filteredExpenses.length === 0 ? (
          <p className="p-6 text-center text-gray-500">
            No expenses found
          </p>
        ) : (
          <table className="w-full">

            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {filteredExpenses.map((item) => (
                <tr key={item.id} className="border-b">

                  <td className="p-3 font-semibold">
                    {item.title}
                  </td>

                  <td className="p-3">
                    {item.category}
                  </td>

                  <td className="p-3 font-bold text-red-500">
                    ₹{item.amount}
                  </td>

                  <td className="p-3">
                    {item.date}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        )}

      </div>
    </div>
  );
};

export default Statement;