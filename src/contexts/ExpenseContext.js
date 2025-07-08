import { createContext, useContext, useState } from 'react';

const ExpenseContext = createContext();
export const useExpenses = () => useContext(ExpenseContext);

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};
