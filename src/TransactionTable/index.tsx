import { useContext } from "react";
import { TransactionContext } from "../TransactionsContext";
import moment from 'moment';

import { Container } from "./styles";

export function TransactionTable() {
  const transactions = useContext(TransactionContext);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
            {transactions.map(transaction => {
              return (
                <tr key={transaction.id}>
                  <td>{transaction.title}</td>
                  <td className={transaction.type}>
                    {/* usando lib nativa do js para tratar formato da moeda local */}
                    {new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})
                    .format(transaction.amount)}
                  </td>
                  <td>{transaction.category}</td>
                  <td>{moment(transaction.createdAt).utc().format('DD/MM/YYYY')}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </Container>
  )
}