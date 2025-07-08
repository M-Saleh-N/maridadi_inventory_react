import { useProducts } from '../../contexts/ProductContext';

const LowStockAlert = () => {
  const { products } = useProducts();

  const today = new Date();
  const threeDaysFromNow = new Date();
  threeDaysFromNow.setDate(today.getDate() + 3);

  const lowStock = products.filter(p => p.quantity <= 5);
  const nearExpiry = products.filter(p => {
    if (!p.expiryDate) return false;
    const expiry = new Date(p.expiryDate);
    return expiry <= threeDaysFromNow;
  });

  if (lowStock.length === 0 && nearExpiry.length === 0) return null;

  return (
    <div className="mb-4 space-y-2">
      {lowStock.length > 0 && (
        <div className="bg-yellow-100 text-yellow-800 p-3 rounded">
          <strong>Low Stock:</strong> {lowStock.map(p => p.name).join(', ')}
        </div>
      )}
      {nearExpiry.length > 0 && (
        <div className="bg-red-100 text-red-800 p-3 rounded">
          <strong>Near Expiry:</strong> {nearExpiry.map(p => p.name).join(', ')}
        </div>
      )}
    </div>
  );
};

export default LowStockAlert;
