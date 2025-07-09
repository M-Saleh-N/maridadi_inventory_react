import { useExpenses } from '../../contexts/ExpenseContext';

const ExpenseSummary = () => {
  const { expenses } = useExpenses();

  const categoryTotals = {};
  const monthlyTotals = {};

  expenses.forEach(exp => {
    // --- Group by category ---
    if (!categoryTotals[exp.category]) {
      categoryTotals[exp.category] = 0;
    }
    categoryTotals[exp.category] += exp.amount;

    // --- Group by month ---
    const date = new Date(exp.date);
    const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}`; // e.g., "2025-07"

    if (!monthlyTotals[monthKey]) {
      monthlyTotals[monthKey] = 0;
    }
    monthlyTotals[monthKey] += exp.amount;
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📈 Expense Summary</h2>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-2">By Category</h3>
        {Object.keys(categoryTotals).length === 0 ? (
          <p className="text-gray-500">No data yet.</p>
        ) : (
          <ul className="space-y-1">
            {Object.entries(categoryTotals).map(([category, total]) => (
              <li key={category} className="text-sm">
                <span className="font-medium">{category}:</span> Ksh {total}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 className="font-semibold text-gray-700 mb-2">By Month</h3>
        {Object.keys(monthlyTotals).length === 0 ? (
          <p className="text-gray-500">No data yet.</p>
        ) : (
          <ul className="space-y-1">
            {Object.entries(monthlyTotals).map(([month, total]) => (
              <li key={month} className="text-sm">
                <span className="font-medium">{month}:</span> Ksh {total}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExpenseSummary;
