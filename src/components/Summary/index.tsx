import { useContext } from "react";

import { Container } from "./styles";

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { TransactionContext } from "../../TransactionsContext";

export function Summary() {
  const transactions = useContext(TransactionContext);
  console.log(transactions)
  
  return (
    <Container>
      {/* TODO: não se usa mais o context desta forma que esta comentada. */}
      {/* <TransactionContext.Consumer>
        {(data) => {
          console.log(data)

          return <p></p>
        }}
      </TransactionContext.Consumer> */}

      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>R$1000,00</strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong>- R$500,00</strong>
      </div>

      <div className="highlight">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>R$500,00</strong>
      </div>
    </Container>
  )
}