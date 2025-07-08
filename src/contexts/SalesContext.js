import { createContext, useContext, useState } from 'react';

const SalesContext = createContext();
export const useSales = () => useContext(SalesContext);

export const SalesProvider = ({ children }) => {
  const [sales, setSales] = useState([]);

  const addSale = (sale) => {
    setSales([...sales, sale]);
  };

  return (
    <SalesContext.Provider value={{ sales, addSale }}>
      {children}
    </SalesContext.Provider>
  );
};
