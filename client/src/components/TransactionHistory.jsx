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

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  componentDidMount(){
    this.getTransactions();
  }

  getTransactions() {
    fetch('/getTransactions', {
      method: "GET",
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`,
      }
    }).then(res => {
      return res.json();
    }).then(res => {
      this.setState({
        money: res.money,
        transactions: res.transactions,
        stocks: res.stocks,
      })
      console.log(this.state.money)
      console.log(this.state.transactions)
      console.log(this.state.stocks)
    });

  }

  showTransactions() {
    if (this.state.transactions) {
      return this.state.transactions.map(trans => {
        return (
          <div key={trans.id}>
            Transactions
            {trans.ticker.toUpperCase()} stock: {trans.shares} shares
          </div>
        )
      })
    }
  }

  checkTransactions() {
    if (this.state.transactions) {
      return this.state.transactions.map(trans => {
        return (
          <div key={trans.id}>
            Transactions
            
            {trans.ticker.toUpperCase()} stock: {trans.shares} shares
          </div>
        )
      })
    }
  }

  render() {
    return (
      <div>
        {this.showTransactions()}
      </div>
    )
  }
}

export default TransactionHistory;
