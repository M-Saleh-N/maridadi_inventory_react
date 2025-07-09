import { useProducts } from '../../contexts/ProductContext';
import { useSales } from '../../contexts/SalesContext';
import { useExpenses } from '../../contexts/ExpenseContext';
import SalesChart from '../charts/SalesChart';
import ExpenseChart from '../charts/ExpenseChart';

const Dashboard = () => {
  const { products } = useProducts();
  const { sales } = useSales();
  const { expenses } = useExpenses();

  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const netProfit = totalRevenue - totalExpenses;

  const lowStockCount = products.filter(p => p.quantity <= 5).length;
  const todaysSales = sales.filter(s => s.date.startsWith(today));

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">📊 Dashboard Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-green-100 text-green-800 p-4 rounded shadow">
          <h3 className="font-bold">Total Revenue</h3>
          <p className="text-2xl">Ksh {totalRevenue}</p>
        </div>

        <div className="bg-red-100 text-red-800 p-4 rounded shadow">
          <h3 className="font-bold">Total Expenses</h3>
          <p className="text-2xl">Ksh {totalExpenses}</p>
        </div>

        <div className="bg-blue-100 text-blue-800 p-4 rounded shadow">
          <h3 className="font-bold">Net Profit</h3>
          <p className="text-2xl">Ksh {netProfit}</p>
        </div>

        <div className="bg-yellow-100 text-yellow-800 p-4 rounded shadow">
          <h3 className="font-bold">Low Stock Items</h3>
          <p className="text-2xl">{lowStockCount}</p>
        </div>

        <div className="bg-purple-100 text-purple-800 p-4 rounded shadow">
          <h3 className="font-bold">Sales Today</h3>
          <p className="text-2xl">{todaysSales.length}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <SalesChart />
        <ExpenseChart />
      </div>
    </div>
  );
};

export default Dashboard;
