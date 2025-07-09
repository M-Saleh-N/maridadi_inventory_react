import { useSales } from '../../contexts/SalesContext';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const SalesChart = () => {
  const { sales } = useSales();

  const monthlySales = {};

  sales.forEach((sale) => {
    const date = new Date(sale.date);
    const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}`;

    if (!monthlySales[monthKey]) {
      monthlySales[monthKey] = 0;
    }
    monthlySales[monthKey] += sale.total;
  });

  const chartData = Object.entries(monthlySales).map(([month, total]) => ({
    month,
    total,
  }));

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-2">📈 Monthly Sales</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#16a34a" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
