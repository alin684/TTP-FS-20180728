import React, { Component } from 'react';

import Auth from '../modules/Auth';

class TransactionHistory extends Component {
  constructor() {
    super();
    this.state = {
      money: '',
      transactions: '',
      stocks: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.getTransactions = this.getTransactions.bind(this);
    this.showTransactions = this.showTransactions.bind(this);
  }
