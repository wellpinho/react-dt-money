import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { axiosApi } from "./../services/api";

interface ITransaction {
  id: number;
  title: string;
  type: string;
  amount: number;
  category: string;
  createdAt: string;
}

// copia todos os campos do ITransaction menos os campos id e createdAt
type ITransactionInput = Omit<ITransaction, "id" | "createdAt">;

interface ITransactionProviderProps {
  // ReactNode diz para a props aceitar qualquer tipo até component
  children: ReactNode;
}

interface ITransactionContextData {
  transactions: ITransaction[];
  createTransaction: (transaction: ITransactionInput) => Promise<void>;
}

const TransactionContext = createContext<ITransactionContextData>(
  {} as ITransactionContextData
);

export function TransactionProvider({ children }: ITransactionProviderProps) {
  const [transactions, setTransaction] = useState<ITransaction[]>([]);

  useEffect(() => {
    axiosApi
      .get("/transactions")
      .then((response) => setTransaction(response.data));
  }, []); // array vazio indica que só quero executar este cara uma vez

  async function createTransaction(transactionInput: ITransactionInput) {
    const response = await axiosApi.post("/transactions", {
      ...transactionInput,
      createdAt: new Date(),
    });
    const { transaction } = response.data;

    // sempre que for inserir informações no estado primeiro copiamos tudo do array
    setTransaction([...transactions, transaction]);
  }

  return (
    <TransactionContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);

  return context;
}
