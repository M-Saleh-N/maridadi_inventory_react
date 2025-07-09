import SalesForm from '../components/sales/SalesForm';
import SalesHistory from '../components/sales/SalesHistory';
import ExportCSV from '../components/common/ExportCSV';
import { useSales } from '../contexts/SalesContext';

const SalesPage = () => {
  const { sales } = useSales();

  // Format each sale into flat rows for CSV
  const salesCSV = sales.flatMap((sale) =>
    sale.items.map((item) => ({
      SaleID: sale.id,
      Date: new Date(sale.date).toLocaleString(),
      Customer: sale.customer || 'N/A',
      PaymentMethod: sale.paymentMethod,
      Item: item.name,
      Quantity: item.quantitySold,
      UnitPrice: item.price,
      Total: item.totalPrice,
    }))
  );

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <SalesForm />
      <div>
        <SalesHistory />
        <ExportCSV
          data={salesCSV}
          filename="sales.csv"
          label="📥 Download Sales CSV"
        />
      </div>
    </div>
  );
};

export default SalesPage;
