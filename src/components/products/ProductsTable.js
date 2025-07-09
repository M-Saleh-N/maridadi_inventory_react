import { useState } from 'react';
import { useProducts } from '../../contexts/ProductContext';
import { useAuth } from '../../contexts/AuthContext'; // 🔐 import Auth
import ProductFormModal from './ProductFormModal';
import LowStockAlert from './LowStockAlert';

const ProductsTable = () => {
  const { products, deleteProduct } = useProducts();
  const { user } = useAuth(); // 🔐 get current user
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const openAddModal = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4">
      <LowStockAlert />

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Product Inventory</h2>
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Product
        </button>
      </div>

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
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => openEditModal(prod)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>

                {user?.role === 'admin' && (
                  <button
                    onClick={() => deleteProduct(prod.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editProduct={productToEdit}
      />
    </div>
  );
};

export default ProductsTable;
