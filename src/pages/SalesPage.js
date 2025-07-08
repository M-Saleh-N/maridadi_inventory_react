import SalesForm from '../components/sales/SalesForm';
import SalesHistory from '../components/sales/SalesHistory';

const SalesPage = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <SalesForm />
      <SalesHistory />
    </div>
  );
};

export default SalesPage;
