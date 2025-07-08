import { useState, useEffect } from 'react';
import { useProducts } from '../../contexts/ProductContext';

const ProductFormModal = ({ isOpen, onClose, editProduct }) => {
  const { addProduct, updateProduct } = useProducts();

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: '',
    quantity: '',
    unit: '',
    cost: '',
    price: '',
    expiryDate: '',
  });

  useEffect(() => {
    if (editProduct) {
      setFormData(editProduct);
    } else {
      setFormData({
        id: '',
        name: '',
        category: '',
        quantity: '',
        unit: '',
        cost: '',
        price: '',
        expiryDate: '',
      });
    }
  }, [editProduct]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      id: formData.id || `SKU${Date.now()}`,
      quantity: parseInt(formData.quantity),
      cost: parseFloat(formData.cost),
      price: parseFloat(formData.price),
    };

    if (editProduct) {
      updateProduct(editProduct.id, productData);
    } else {
      addProduct(productData);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {editProduct ? 'Edit Product' : 'Add Product'}
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            name="quantity"
            type="number"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            name="unit"
            placeholder="Unit (e.g., stems)"
            value={formData.unit}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="cost"
            type="number"
            placeholder="Unit Cost"
            value={formData.cost}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            name="price"
            type="number"
            placeholder="Selling Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            name="expiryDate"
            type="date"
            value={formData.expiryDate}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              {editProduct ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
