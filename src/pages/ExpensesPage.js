import ExpenseForm from '../components/expenses/ExpenseForm';
import ExpenseList from '../components/expenses/ExpenseList';
import ExpenseSummary from '../components/expenses/ExpenseSummary';
import ExportCSV from '../components/common/ExportCSV';
import { useExpenses } from '../contexts/ExpenseContext';

const ExpensesPage = () => {
  const { expenses } = useExpenses();

  const expenseCSV = expenses.map(exp => ({
    ID: exp.id,
    Name: exp.name,
    Category: exp.category,
    Amount: exp.amount,
    Date: new Date(exp.date).toLocaleDateString(),
  }));

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <ExpenseForm />
      <ExpenseList />
      <div>
        <ExpenseSummary />
        <ExportCSV
          data={expenseCSV}
          filename="expenses.csv"
          label="📥 Download Expenses CSV"
        />
      </div>
    </div>
  );
};

export default ExpensesPage;
