import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditExpense = () => {

  const { id } = useParams(); // get expense id from URL
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    note: ""
  });

  // ================= FETCH SINGLE EXPENSE =================
  const fetchExpense = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/expenses/${id}`);
      const data = await res.json();

      if (!res.ok) throw new Error("Failed to fetch expense");

      setFormData(data);
      setLoading(false);

    } catch (error) {
      console.error(error);
      alert("Error loading expense");
    }
  };

  useEffect(() => {
    fetchExpense();
  }, [id]);

  // ================= HANDLE INPUT CHANGE =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ================= UPDATE EXPENSE =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`http://127.0.0.1:5000/update-expense/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error("Update failed");
      }

      alert("Expense updated successfully!");

      navigate("/"); // go back to dashboard

    } catch (error) {
      console.error(error);
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="p-6">Loading expense...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-4 md:p-8 rounded-xl shadow-md w-full max-w-lg md:max-w-xl">

        <h2 className="text-2xl font-bold mb-4">
          Edit Expense
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          {/* TITLE */}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Expense Title"
            className="w-full p-2 border rounded"
            required
          />

          {/* AMOUNT */}
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount"
            className="w-full p-2 border rounded"
            required
          />

          {/* CATEGORY */}
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full p-2 border rounded"
            required
          />

          {/* DATE */}
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          {/* NOTE */}
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="Note"
            className="w-full p-2 border rounded"
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            {saving ? "Updating..." : "Update Expense"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default EditExpense;