import { useRef } from 'react';

const ReceiptModal = ({ isOpen, onClose, sale }) => {
  const receiptRef = useRef();

  const handlePrint = () => {
    const printContents = receiptRef.current.innerHTML;
    const newWin = window.open('', '', 'width=600,height=800');
    newWin.document.write(`
      <html>
        <head>
          <title>Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .receipt { max-width: 500px; margin: auto; }
            h2 { text-align: center; }
            .info p { margin: 4px 0; }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            th, td {
              padding: 8px;
              border-bottom: 1px solid #ccc;
              text-align: left;
            }
            .total {
              text-align: right;
              margin-top: 10px;
              font-weight: bold;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              font-style: italic;
              color: #555;
            }
          </style>
        </head>
        <body>
          <div class="receipt">
            ${printContents}
            <p class="footer">Thank you for your purchase! 🌸</p>
          </div>
        </body>
      </html>
    `);
    newWin.document.close();
    newWin.print();
  };

  if (!isOpen || !sale) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
        <div ref={receiptRef} className="receipt">
          <h2 className="text-xl font-bold text-center mb-2">Maridadi Bouquets KE</h2>
          <p className="text-center text-sm">Nakuru, Kenya</p>
          <hr className="my-2" />

          <div className="text-sm info">
            <p><strong>Sale ID:</strong> {sale.id}</p>
            <p><strong>Date:</strong> {new Date(sale.date).toLocaleString()}</p>
            {sale.customer && <p><strong>Customer:</strong> {sale.customer}</p>}
            <p><strong>Payment:</strong> {sale.paymentMethod}</p>
          </div>

          <table className="mt-4 text-sm">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {sale.items.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td>{item.quantitySold}</td>
                  <td>Ksh {item.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-right mt-4 font-bold">
            Total: Ksh {sale.total}
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-3 py-1 bg-gray-300 rounded">
            Close
          </button>
          <button onClick={handlePrint} className="px-3 py-1 bg-green-600 text-white rounded">
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
