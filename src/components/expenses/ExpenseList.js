import { useExpenses } from '../../contexts/ExpenseContext';

const ExpenseList = () => {
  const { expenses } = useExpenses();

  if (expenses.length === 0) {
    return <p className="text-gray-600">No expenses recorded yet.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Expense History</h2>
      <div className="space-y-3">
        {expenses.map((exp) => (
          <div key={exp.id} className="border rounded p-3 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">{exp.name}</p>
                <p className="text-sm text-gray-500">{exp.category}</p>
              </div>
              <div className="text-right">
                <p>Ksh {exp.amount}</p>
                <p className="text-sm">{new Date(exp.date).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
