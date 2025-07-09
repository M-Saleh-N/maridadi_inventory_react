import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ProductProvider } from './contexts/ProductContext';
import { SalesProvider } from './contexts/SalesContext';
import { ExpenseProvider } from './contexts/ExpenseContext';

import ProductsTable from './components/products/ProductsTable';
import SalesPage from './pages/SalesPage';
import ExpensesPage from './pages/ExpensesPage';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
    <ProductProvider>
      <SalesProvider>
        <ExpenseProvider>
          <Router>
            <div className="min-h-screen bg-white p-4">
              <header className="mb-6 text-center">
                <h1 className="text-2xl font-bold">Maridadi Bouquets KE</h1>
                <nav className="mt-4 flex justify-center gap-6 text-blue-600 underline">
                  <Link to="/">Dashboard</Link>
                  <Link to="/inventory">Inventory</Link>
                  <Link to="/sales">Sales</Link>
                  <Link to="/expenses">Expenses</Link>
                </nav>
              </header>

              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/inventory" element={<ProductsTable />} />
                <Route path="/sales" element={<SalesPage />} />
                <Route path="/expenses" element={<ExpensesPage />} />
              </Routes>
            </div>
          </Router>
        </ExpenseProvider>
      </SalesProvider>
    </ProductProvider>
  );
}

export default App;
