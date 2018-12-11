import React, { Component } from 'react';

import Auth from '../modules/Auth';

class TransactionHistory extends Component {
  constructor() {
    super();
    this.state = {
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
      <div>
        Hello
      </div>
    )
  }
}

export default TransactionHistory;
