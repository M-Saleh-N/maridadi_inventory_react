import SalesForm from '../components/sales/SalesForm';
import SalesHistory from '../components/sales/SalesHistory';
import ExportSalesCSV from '../components/sales/ExportSalesCSV';

const SalesPage = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <SalesForm />
      <div>
      <SalesHistory />
       <ExportSalesCSV />
       </div>
    </div>
  );
};

export default SalesPage;
