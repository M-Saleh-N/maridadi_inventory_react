import { useProducts } from '../../contexts/ProductContext';

const ProductsTable = () => {
  const { products, deleteProduct } = useProducts();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Product Inventory</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Qty</th>
            <th className="p-2 border">Unit</th>
            <th className="p-2 border">Cost</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Expiry</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod.id}>
              <td className="p-2 border">{prod.name}</td>
              <td className="p-2 border">{prod.category}</td>
              <td className="p-2 border">{prod.quantity}</td>
              <td className="p-2 border">{prod.unit}</td>
              <td className="p-2 border">Ksh {prod.cost}</td>
              <td className="p-2 border">Ksh {prod.price}</td>
              <td className="p-2 border">{prod.expiryDate || '-'}</td>
              <td className="p-2 border">
                <button
                  onClick={() => deleteProduct(prod.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan="8" className="text-center p-4">
                No products yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
