import { useState } from 'react';
import { useExpenses } from '../../contexts/ExpenseContext';

const ExpenseForm = () => {
  const { addExpense } = useExpenses();

  const [form, setForm] = useState({
    name: '',
    category: '',
    amount: '',
    date: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newExpense = {
      id: `EXP${Date.now()}`,
      name: form.name,
      category: form.category,
      amount: parseFloat(form.amount),
      date: form.date || new Date().toISOString(),
    };

    addExpense(newExpense);
    setForm({ name: '', category: '', amount: '', date: '' });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Add Expense</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          name="name"
          placeholder="Expense Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category (e.g., Printing)"
          value={form.category}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount (Ksh)"
          value={form.amount}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">
          Save Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
