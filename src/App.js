import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { ProductProvider } from './contexts/ProductContext';
import { SalesProvider } from './contexts/SalesContext';
import { ExpenseProvider } from './contexts/ExpenseContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

import ProductsTable from './components/products/ProductsTable';
import SalesPage from './pages/SalesPage';
import ExpensesPage from './pages/ExpensesPage';
import Dashboard from './components/dashboard/Dashboard';
import LoginPage from './pages/LoginPage';

// 🔐 Protect private routes
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <LoginPage />;
};

function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <header className="mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold">Maridadi Bouquets KE</h1>

          {user && (
            <div className="flex items-center gap-4 mt-2 md:mt-0">
              <span className="text-sm text-gray-600">👤 {user.username} ({user.role})</span>
              <button
                onClick={handleLogout}
                className="text-red-600 underline text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {user && (
          <nav className="mt-4 flex justify-center gap-6 text-blue-600 underline">
            <Link to="/">Dashboard</Link>
            <Link to="/inventory">Inventory</Link>
            <Link to="/sales">Sales</Link>
            <Link to="/expenses">Expenses</Link>
          </nav>
        )}
      </header>

      <Routes>
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/inventory" element={<PrivateRoute><ProductsTable /></PrivateRoute>} />
        <Route path="/sales" element={<PrivateRoute><SalesPage /></PrivateRoute>} />
        <Route path="/expenses" element={<PrivateRoute><ExpensesPage /></PrivateRoute>} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <SalesProvider>
          <ExpenseProvider>
            <Router>
              <AppLayout />
            </Router>
          </ExpenseProvider>
        </SalesProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
