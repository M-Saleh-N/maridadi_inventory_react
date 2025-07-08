import { useSales } from '../../contexts/SalesContext';

const SalesHistory = () => {
  const { sales } = useSales();

  if (sales.length === 0) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Sales History</h2>
        <p className="text-gray-600">No sales recorded yet.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Sales History</h2>

      <div className="space-y-6">
        {sales.map((sale) => (
          <div key={sale.id} className="border rounded p-4 shadow-sm">
            <div className="flex justify-between mb-2">
              <div>
                <p className="font-semibold">Sale ID: {sale.id}</p>
                <p>Date: {new Date(sale.date).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p>Customer: {sale.customer || 'N/A'}</p>
                <p>Payment: {sale.paymentMethod}</p>
              </div>
            </div>

            <table className="w-full text-sm border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-1">Item</th>
                  <th className="border p-1">Qty</th>
                  <th className="border p-1">Unit Price</th>
                  <th className="border p-1">Total</th>
                </tr>
              </thead>
              <tbody>
                {sale.items.map((item, i) => (
                  <tr key={i}>
                    <td className="border p-1">{item.name}</td>
                    <td className="border p-1">{item.quantitySold}</td>
                    <td className="border p-1">Ksh {item.price}</td>
                    <td className="border p-1">Ksh {item.totalPrice}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="3" className="text-right font-bold p-1 border">Total:</td>
                  <td className="font-bold p-1 border">Ksh {sale.total}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesHistory;
