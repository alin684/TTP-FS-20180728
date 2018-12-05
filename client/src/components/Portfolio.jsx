import React, { Component } from 'react';

import { Message, Icon } from 'semantic-ui-react'

import Auth from '../modules/Auth';

class Portfolio extends Component {
  constructor() {
    super();
    this.state = {
      money: '',
      ticker: '',
      shares: '',
      transactions: '',
      error: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.makeTransaction = this.makeTransaction.bind(this);
    this.getTransactions = this.getTransactions.bind(this);
  }

  componentDidMount(){
    fetch('/profile', {
      method: 'GET',
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`,
      }
    }).then(res => res.json())
    .then(res => {
      console.log(res)
      this.setState({
        money: res.money,
      })
    })
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  makeTransaction(e) {
    e.preventDefault();

    let money = this.state.money;
    let ticker = this.state.ticker;
    let shares = this.state.shares;

    fetch(`https://api.iextrading.com/1.0/stock/${ticker}/price`)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          this.setState({ error: true});
        }
      })
      .then(price => {
        if ((price * shares) < money) {
          console.log(money - (price*shares))
        } else {
          this.setState({ error: true})
        }
      })
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
      let money = res.money;
      let transactions = res.transactions.map(trans => {
        return (
          <p>
            {`You have ${trans.shares} shares of ${trans.ticker} stock.`}
          </p>
        )
      })
      this.setState({
        transactions: transactions,
        money: money
      })
    });

  }

  render() {
    let message = <Message attached='bottom' warning>
      <Icon name='warning circle' />
      Something went wrong. Please try again!
    </Message>

    return (
      <div>
        <div> ACCOUNT BALANCE: $ {this.state.money} </div>
        <br />
        <div className="form">
          <form onSubmit={this.makeTransaction} >
            <input type="ticker" name="ticker" placeholder="ticker symbol" value={this.state.ticker} onChange={this.handleChange} />
            <br />
            <input type="shares" name="shares" placeholder="shares" value={this.state.shares} onChange={this.handleChange} />
            <br />
            <input type="submit" value="Buy" />
          </form>
        </div>
      </div>


    )
  }
}

export default Portfolio;
