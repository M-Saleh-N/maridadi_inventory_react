import { saveAs } from 'file-saver';
import Papa from 'papaparse';

const ExportCSV = ({ data, filename = 'data.csv', label = 'Export to CSV' }) => {
  const handleExport = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, filename);
  };

  return (
    <button
      onClick={handleExport}
      className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
    >
      {label}
    </button>
  );
};

export default ExportCSV;
