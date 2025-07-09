import { useExpenses } from '../../contexts/ExpenseContext';
import { CSVLink } from 'react-csv';

const ExportExpensesCSV = () => {
  const { expenses } = useExpenses();

  // Define CSV headers
  const headers = [
    { label: 'Expense ID', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Category', key: 'category' },
    { label: 'Amount (Ksh)', key: 'amount' },
    { label: 'Date', key: 'formattedDate' },
  ];

  // Format data for export
  const data = expenses.map(e => ({
    id: e.id,
    name: e.name,
    category: e.category,
    amount: e.amount,
    formattedDate: new Date(e.date).toLocaleDateString(),
  }));

  return (
    <div className="mt-4">
      <CSVLink
        data={data}
        headers={headers}
        filename={`expenses_${Date.now()}.csv`}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
      >
        Export Expenses to CSV
      </CSVLink>
    </div>
  );
};

export default ExportExpensesCSV;
