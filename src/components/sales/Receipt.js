import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const Receipt = ({ sale }) => {
  const receiptRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
  });

  if (!sale) return null;

  return (
    <div className="mt-4">
      <button
        onClick={handlePrint}
        className="bg-green-600 text-white px-4 py-2 rounded mb-2"
      >
        🧾 Print Receipt
      </button>

      <div
        ref={receiptRef}
        className="p-4 bg-white border rounded shadow w-full max-w-md text-sm print:p-0 print:border-0 print:shadow-none"
      >
        <h2 className="text-lg font-bold text-center mb-2">Maridadi Bouquets KE</h2>
        <p className="text-center mb-4">🌸 Nakuru, Kenya</p>
        <hr className="mb-2" />

        <p><strong>Date:</strong> {new Date(sale.date).toLocaleString()}</p>
        <p><strong>Customer:</strong> {sale.customer || 'N/A'}</p>
        <p><strong>Payment Method:</strong> {sale.paymentMethod}</p>

        <hr className="my-2" />
        <table className="w-full mb-2">
          <thead>
            <tr>
              <th className="text-left">Item</th>
              <th className="text-right">Qty</th>
              <th className="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {sale.items.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td className="text-right">{item.quantitySold}</td>
                <td className="text-right">Ksh {item.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <hr />
        <p className="text-right font-bold mt-2">Total: Ksh {sale.total}</p>
        <p className="text-center mt-4 text-xs italic">Thank you for shopping with us!</p>
      </div>
    </div>
  );
};

export default Receipt;
