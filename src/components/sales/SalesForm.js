import { useState } from 'react';
import { useProducts } from '../../contexts/ProductContext';
import { useSales } from '../../contexts/SalesContext';
import ReceiptModal from './ReceiptModal'; // ⬅️ Import the receipt modal

const SalesForm = () => {
  const { products } = useProducts();
  const { addSale } = useSales();

  const [itemsSold, setItemsSold] = useState([]);
  const [customer, setCustomer] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');

  const [lastSale, setLastSale] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);

  const handleQuantityChange = (productId, quantity) => {
    const existing = itemsSold.find(item => item.productId === productId);
    const updated = existing
      ? itemsSold.map(item =>
          item.productId === productId
            ? { ...item, quantity: parseInt(quantity) }
            : item
        )
      : [...itemsSold, { productId, quantity: parseInt(quantity) }];

    setItemsSold(updated.filter(item => item.quantity > 0));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const soldDetails = itemsSold.map(({ productId, quantity }) => {
      const product = products.find(p => p.id === productId);
      return {
        ...product,
        quantitySold: quantity,
        totalPrice: quantity * product.price,
      };
    });

    const total = soldDetails.reduce((sum, item) => sum + item.totalPrice, 0);

    const sale = {
      id: `SALE${Date.now()}`,
      items: soldDetails,
      total,
      customer,
      paymentMethod,
      date: new Date().toISOString(),
    };

    addSale(sale);
    setLastSale(sale);
    setShowReceipt(true); // ⬅️ Trigger modal

    // Reset form
    setItemsSold([]);
    setCustomer('');
    setPaymentMethod('Cash');
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Record a Sale</h2>

      <form onSubmit={handleSubmit} className="grid gap-4">
        {products.map(product => (
          <div key={product.id} className="flex justify-between items-center">
            <span>{product.name} (Ksh {product.price})</span>
            <input
              type="number"
              min="0"
              placeholder="Qty"
              className="w-24 border p-1 rounded"
              onChange={(e) => handleQuantityChange(product.id, e.target.value)}
            />
          </div>
        ))}

        <input
          type="text"
          placeholder="Customer Name (optional)"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="Cash">Cash</option>
          <option value="M-Pesa">M-Pesa</option>
          <option value="Card">Card</option>
        </select>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Sale
        </button>
      </form>

      {/* Show receipt modal */}
      <ReceiptModal
        isOpen={showReceipt}
        onClose={() => setShowReceipt(false)}
        sale={lastSale}
      />
    </div>
  );
};

export default SalesForm;
