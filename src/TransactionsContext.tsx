import { createContext, ReactNode, useEffect, useState } from 'react';
import { axiosApi } from './services/api';

interface ITransaction {
  id: number;
  title: string;
  type: string;
  amount: number;
  category: string;
  createdAt: string;
}

  // extend todos os campos do ITransaction menos os campos id e createdAt
type ITransactionInput = Omit<ITransaction, 'id' | 'createdAt'>;

interface ITransactionProviderProps {
  // ReactNode diz para a props aceitar qualquer tipo até component
  children: ReactNode;
}

export const TransactionContext = createContext<ITransaction[]>([])

export function TransactionProvider({ children }: ITransactionProviderProps) {
  const [transactions, setTransaction] = useState<ITransaction[]>([])
  
  useEffect(() => {
    axiosApi.get('/transactions')
    .then((response) => setTransaction(response.data))
  }, []) // array vazio indica que só quero executar este cara uma vez

  function createTransaction(transaction: ITransactionInput) {
    axiosApi.post('/transactions', transaction)
  }

  return <TransactionContext.Provider value={transactions}>
    { children }
  </TransactionContext.Provider>
}