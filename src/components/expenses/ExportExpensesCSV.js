import { useExpenses } from '../../contexts/ExpenseContext';
import { CSVLink } from 'react-csv';

const ExportExpensesCSV = () => {
  const { expenses } = useExpenses();

  const headers = [
    { label: 'Expense ID', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Category', key: 'category' },
    { label: 'Amount (Ksh)', key: 'amount' },
    { label: 'Date', key: 'date' },
  ];

  const data = expenses.map(e => ({
    id: e.id,
    name: e.name,
    category: e.category,
    amount: e.amount,
    date: new Date(e.date).toLocaleDateString(),
  }));

  return (
    <div className="mt-4">
      <CSVLink
        data={data}
        headers={headers}
        filename="expenses_data.csv"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Export Expenses to CSV
      </CSVLink>
    </div>
  );
};

export default ExportExpensesCSV;
