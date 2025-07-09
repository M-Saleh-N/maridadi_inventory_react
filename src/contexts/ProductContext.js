import { createContext, useState, useContext } from 'react';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([
    // Sample product
    {
      id: 'SKU001',
      name: 'Red Roses',
      category: 'Fresh Flowers',
      quantity: 25,
      unit: 'stems',
      cost: 10,
      price: 20,
      expiryDate: '2025-07-15',
    },
  ]);

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(p => (p.id === id ? updatedProduct : p)));
  };

  // ✅ Delete with user role check
  const deleteProduct = (id, user) => {
    if (!user || user.role !== 'admin') {
      alert('Only admins can delete products.');
      return;
    }

    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};
