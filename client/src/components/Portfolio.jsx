import React, { Component } from 'react';

import Auth from '../modules/Auth';

class Portfolio extends Component {
  constructor() {
    super();
    this.state = {
      money: '',
      ticker: '',
      shares: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.makeTransaction = this.makeTransaction.bind(this);
    // this.getTransactions = this.getTransactions.bind(this);
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

  makeTransaction() {

  }

  render() {
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
