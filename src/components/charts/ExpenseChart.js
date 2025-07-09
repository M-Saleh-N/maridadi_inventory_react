import { useExpenses } from '../../contexts/ExpenseContext';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const ExpenseChart = () => {
  const { expenses } = useExpenses();

  const monthlyExpenses = {};

  expenses.forEach((exp) => {
    const date = new Date(exp.date);
    const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}`;

    if (!monthlyExpenses[monthKey]) {
      monthlyExpenses[monthKey] = 0;
    }
    monthlyExpenses[monthKey] += exp.amount;
  });

  const chartData = Object.entries(monthlyExpenses).map(([month, total]) => ({
    month,
    total,
  }));

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-2">💸 Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#dc2626" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;
