import { useSales } from '../../contexts/SalesContext';
import { CSVLink } from 'react-csv';

const ExportSalesCSV = () => {
  const { sales } = useSales();

  const headers = [
    { label: 'Sale ID', key: 'id' },
    { label: 'Customer', key: 'customer' },
    { label: 'Payment Method', key: 'paymentMethod' },
    { label: 'Date', key: 'date' },
    { label: 'Total (Ksh)', key: 'total' },
  ];

  const data = sales.map(s => ({
    id: s.id,
    customer: s.customer || 'N/A',
    paymentMethod: s.paymentMethod,
    date: new Date(s.date).toLocaleString(),
    total: s.total,
  }));

  return (
    <div className="mt-4">
      <CSVLink
        data={data}
        headers={headers}
        filename="sales_data.csv"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Export Sales to CSV
      </CSVLink>
    </div>
  );
};

export default ExportSalesCSV;
