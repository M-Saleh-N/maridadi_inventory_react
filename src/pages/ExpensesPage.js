import ExpenseForm from '../components/expenses/ExpenseForm';
import ExpenseList from '../components/expenses/ExpenseList';
import ExpenseSummary from '../components/expenses/ExpenseSummary';

const ExpensesPage = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <ExpenseForm />
      <ExpenseList />
      <ExpenseSummary />
    </div>
  );
};

export default ExpensesPage;
