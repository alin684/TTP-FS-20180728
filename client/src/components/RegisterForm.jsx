import React, { Component } from 'react';

class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      password: '',
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
        <form onSubmit={(e) => this.props.handleRegister(e, this.state)}>
          <input type="email" name="email" placeholder="email" value={this.state.email} onChange={this.handleChange} />
          <br />
          <input type="text" name="name" placeholder="name" value={this.state.name} onChange={this.handleChange} />
          <br />
          <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} />
          <br />
          <input type="submit" value="Register" />
        </form>
      </div>
    )
  }
}

export default RegisterForm;
