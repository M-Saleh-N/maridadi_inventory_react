import { ProductProvider } from './contexts/ProductContext';
import ProductsTable from './components/products/ProductsTable';

function App() {
  return (
    <ProductProvider>
      <div className="min-h-screen bg-white p-4">
        <h1 className="text-2xl font-bold text-center mb-6">
          Maridadi Bouquets KE - Inventory System
        </h1>
        <ProductsTable />
      </div>
    </ProductProvider>
  );
}

export default App;
