import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';

import { App } from './App';

createServer({
  models: {
    transitions: Model
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de um sistema web',
          type: 'deposit',
          category: 'Desenvolvimento',
          amount: 6000,
          createdAt: new Date('2022-03-12 09:00:00')
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'casa',
          amount: 750,
          createdAt: new Date('2022-03-05 16:00:00')
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      // return this.schema.all('transactions')
      return this.schema.db.transactions;
    });

    this.post('/transactions', (schema, request) => {
      // convertendo o dado do tipo texto para json
      const data = JSON.parse(request.requestBody)

      return schema.create('transactions', data)
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);