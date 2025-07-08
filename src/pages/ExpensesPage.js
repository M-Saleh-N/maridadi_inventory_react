import ExpenseForm from '../components/expenses/ExpenseForm';
import ExpenseList from '../components/expenses/ExpenseList';

const ExpensesPage = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <ExpenseForm />
      <ExpenseList />
    </div>
  );
};

export default ExpensesPage;
