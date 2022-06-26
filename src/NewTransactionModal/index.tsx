import { FormEvent, useContext, useState } from 'react';
import { TransactionContext } from '../TransactionsContext';

import Modal from 'react-modal';
import { Container, RadioBox, TransactionTypeContainer } from "./styles";

import closeImg from './../assets/close.svg';
import incomeImg from './../assets/income.svg';
import outcomeImg from './../assets/outcome.svg';
import { axiosApi } from '../services/api';

interface INewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}
// react modal sem isso fica acoplado ao elemento body
Modal.setAppElement('#root');

export function NewTransactionModal({isOpen, onRequestClose}: INewTransactionModalProps) {
  const transaction = useContext(TransactionContext);
  // salvando cada input no seu estado
  const [title, setTitle] = useState('');
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState('');

  const [type, setType] = useState('deposit');

  function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    const data = {
      title, value, category, type,
    };

    axiosApi.post('/transactions', data)
  }

  return (
      <Modal
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        isOpen={isOpen}
        onRequestClose={onRequestClose}
      >
        <button 
          type="button" 
          onClick={onRequestClose}
          className="react-modal-close"
        >
          <img src={closeImg} alt="fechar modal" />
        </button>

        {/* onSubmit envia toda os dados dos inpputs para o estado da função chamada */}
        <Container onSubmit={handleCreateNewTransaction}>
          <h2>Cadastrar transação</h2>
            <input 
              type="text" 
              placeholder="Título" 
              value={title}
              // onChange executa toda vez que tiver um novo valor no input
              onChange={(e) => setTitle(e.target.value)}
            />
            <input 
              type="number" 
              placeholder="Valor" 
              value={value}
              // onChange executa toda vez que tiver um novo valor no input
              // quando o input é do tipo numerical precisa converter para numero o target
              onChange={(e) => setValue(Number(e.target.value))} 
            />

            <TransactionTypeContainer>
              {/* funções pequenas pode ser feita direto no onClick */}
              <RadioBox 
                type="button"
                onClick={() => {setType('deposit')}}
                isActive={type === 'deposit'}
                activeColor="green"
              >
                <img src={incomeImg} alt="entrada" />
                <span>Entrada</span>
              </RadioBox>

              {/* funções pequenas pode ser feita direto no onClick */}
              <RadioBox 
                type="button" 
                onClick={() => {setType('withdraw')}}
                isActive={type === 'withdraw'}
                activeColor="red"
              >
                <img src={outcomeImg} alt="saída" />
                <span>Saída</span>
              </RadioBox>
            </TransactionTypeContainer>

            <input 
              type="text" 
              placeholder="Categoria"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <button type="submit">Cadastrar</button>
        </Container>
      </Modal>
  )
}