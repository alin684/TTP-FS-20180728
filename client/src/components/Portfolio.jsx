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
      stocks: '',
      error: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.buyStock = this.buyStock.bind(this);
    this.getTransactions = this.getTransactions.bind(this);
    this.stockShower = this.stockShower.bind(this);
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

  buyStock(e) {
    e.preventDefault();

    let money = this.state.money;
    let ticker = this.state.ticker;
    let shares = this.state.shares;

    fetch(`https://api.iextrading.com/1.0/stock/${ticker}/price`)
      .then(res => {
        if (res.status === 200) {
          this.setState({ error: false})
          return res.json();
        } else {
          this.setState({ error: true});
        }
      })
      .then(price => {
        if ((price * shares) < money) {
          fetch('/buyStock', {
            method: 'POST',
            body: JSON.stringify({ ticker: ticker, price: price, shares:shares }),
            headers: {
              'Content-Type': 'application/json',
              token: Auth.getToken(),
              'Authorization': `Token ${Auth.getToken()}`,
            }
          })
          .then(res => res.json())
          .then(res => {
            this.getTransactions();
          })
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
      console.log(res)
      this.setState({
        money: res.money,
        transactions: res.transactions,
        stocks: res.stocks,
        error: false,
      })
    });

  }

  stockShower() {
    if (this.state.stocks) {
      this.state.stocks.map(stock => {
        return (
          <div>
            {`You have ${stock.shares} shares of ${stock.ticker} stock.`}
          </div>
        )
      })
    }
  }

  render() {
    let message = <Message attached='bottom' warning>
      <Icon name='warning circle' />
      Something went wrong. Please try again!
    </Message>

    return (
      <div>

        {this.state.error ? message : null}

        <div> ACCOUNT BALANCE: $ {this.state.money} </div>
        <br />
        <div className="form">
          <form onSubmit={this.buyStock} >
            <input type="ticker" name="ticker" placeholder="ticker symbol" value={this.state.ticker} onChange={this.handleChange} />
            <br />
            <input type="shares" name="shares" placeholder="shares" value={this.state.shares} onChange={this.handleChange} />
            <br />
            <input type="submit" value="Buy Stock" />
          </form>
        </div>
        <br />
        <br />
        STOCKS:
        <br />
        {this.stockShower()}
      </div>


    )
  }
}

export default Portfolio;
