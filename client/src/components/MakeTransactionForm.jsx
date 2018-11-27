import React, { Component } from 'react';

import Auth from '../modules/Auth';

class MakeTransactionForm extends Component {
  constructor() {
    super();
    this.state = {
      ticker: '',
      shares: '',
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div className="form">
        <form onSubmit={(e) => this.props.makeTransaction(e, this.state)} >
          <input type="ticker" name="ticker" placeholder="ticker symbol" value={this.state.ticker} onChange={this.handleInputChange} />
          <input type="shares" name="shares" placeholder="shares" value={this.state.shares} onChange={this.handleInputChange} />
          <input type="submit" value="Make Transaction" />
        </form>
      </div>
    )
  }
}
