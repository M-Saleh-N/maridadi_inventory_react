import { ProductProvider } from './contexts/ProductContext';
import { SalesProvider } from './contexts/SalesContext';
import ProductsTable from './components/products/ProductsTable';
import SalesForm from './components/sales/SalesForm';
import { ExpenseProvider } from './contexts/ExpenseContext';
import ExpensesPage from './pages/ExpensesPage';

<ExpenseProvider>
  <ExpensesPage />
</ExpenseProvider>


function App() {
  return (
    <ProductProvider>
      <SalesProvider>
        <div className="min-h-screen bg-white p-4">
          <h1 className="text-2xl font-bold text-center mb-6">
            Maridadi Bouquets KE - Inventory System
          </h1>
          <div className="grid md:grid-cols-2 gap-6">
            <ProductsTable />
            <SalesForm />
          </div>
        </div>
      </SalesProvider>
    </ProductProvider>
  );
}

export default App;
