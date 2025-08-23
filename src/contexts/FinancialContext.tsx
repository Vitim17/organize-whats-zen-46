import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export interface Transaction {
  id: number;
  type: 'entrada' | 'saida';
  description: string;
  value: number;
  date: Date;
  category?: string;
  notes?: string;
}

interface FinancialContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  updateTransaction: (id: number, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: number) => void;
  getTransactionsByType: (type: 'entrada' | 'saida') => Transaction[];
  getTotalBalance: () => number;
  getTotalIncome: () => number;
  getTotalExpenses: () => number;
  getTransactionsByDateRange: (startDate: Date, endDate: Date) => Transaction[];
}

const FinancialContext = createContext<FinancialContextType | undefined>(undefined);

export const useFinancialContext = () => {
  const context = useContext(FinancialContext);
  if (!context) {
    throw new Error('useFinancialContext deve ser usado dentro de um FinancialProvider');
  }
  return context;
};

interface FinancialProviderProps {
  children: ReactNode;
}

export const FinancialProvider = ({ children }: FinancialProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      type: 'entrada',
      description: 'Salário',
      value: 3500,
      date: new Date(),
      category: 'Trabalho'
    },
    {
      id: 2,
      type: 'saida',
      description: 'Supermercado',
      value: 150,
      date: new Date(Date.now() - 24 * 60 * 60 * 1000), // Ontem
      category: 'Alimentação'
    },
    {
      id: 3,
      type: 'entrada',
      description: 'Freelance',
      value: 800,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 dias atrás
      category: 'Trabalho'
    }
  ]);

  const addTransaction = useCallback((transactionData: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: Date.now(),
      date: new Date()
    };
    setTransactions(prev => [newTransaction, ...prev]);
  }, []);

  const updateTransaction = useCallback((id: number, updates: Partial<Transaction>) => {
    setTransactions(prev => prev.map(transaction => 
      transaction.id === id ? { ...transaction, ...updates } : transaction
    ));
  }, []);

  const deleteTransaction = useCallback((id: number) => {
    setTransactions(prev => prev.filter(transaction => transaction.id !== id));
  }, []);

  const getTransactionsByType = useCallback((type: 'entrada' | 'saida'): Transaction[] => {
    return transactions.filter(transaction => transaction.type === type);
  }, [transactions]);

  const getTotalBalance = useCallback((): number => {
    return transactions.reduce((total, transaction) => {
      return transaction.type === 'entrada' ? total + transaction.value : total - transaction.value;
    }, 0);
  }, [transactions]);

  const getTotalIncome = useCallback((): number => {
    return getTransactionsByType('entrada').reduce((total, transaction) => total + transaction.value, 0);
  }, [getTransactionsByType]);

  const getTotalExpenses = useCallback((): number => {
    return getTransactionsByType('saida').reduce((total, transaction) => total + transaction.value, 0);
  }, [getTransactionsByType]);

  const getTransactionsByDateRange = useCallback((startDate: Date, endDate: Date): Transaction[] => {
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
  }, [transactions]);

  const contextValue: FinancialContextType = {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionsByType,
    getTotalBalance,
    getTotalIncome,
    getTotalExpenses,
    getTransactionsByDateRange
  };

  return (
    <FinancialContext.Provider value={contextValue}>
      {children}
    </FinancialContext.Provider>
  );
};
