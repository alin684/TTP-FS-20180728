import React, { Component } from 'react';
import './App.css';

import {BrowserRouter as Router, Link, Redirect, Route}
  from 'react-router-dom';

import Auth from './modules/Auth';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Home from './components/Home';

class App extends Component {
  constructor() {
    super();
    this.state = {
      auth: Auth.isUserAuthenticated(),
      shouldGoHome: false,
    };
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleRegister(e, data) {
    e.preventDefault();
    fetch('/users', {
      method: 'POST',
      body: JSON.stringify({
        user: data,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => res.json())
      .then(res => {
        Auth.authenticateToken(res.token);
        this.setState({
          auth: Auth.isUserAuthenticated(),
          shouldGoHome: true,
        });
      }).catch(err => {
        console.log(err);
      });
  }

  handleLogin(e, data) {
    e.preventDefault();
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => res.json())
    .then(res => {
      Auth.authenticateToken(res.token);
      this.setState({
        auth: Auth.isUserAuthenticated(),
        shouldGoHome: true,
      });
    }).catch(err => console.log(err));
  }

  handleLogout() {
    fetch('/logout', {
      method: 'DELETE',
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`,
      }
    }).then(res => {
      Auth.deauthenticateToken();
      this.setState({
        auth: Auth.isUserAuthenticated(),
      })
    }).catch(err => console.log(err));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="navBar">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/home">Home</Link>
            <span onClick={this.handleLogout}>Logout</span>
          </div>
          <Route
            exact path="/register"
            render={() => (this.state.auth)
              ? <Redirect to="/home" />
              : <RegisterForm handleRegister={this.handleRegister} /> } />
          <Route
            exact path="/login"
            render={() => (this.state.auth)
              ? <Redirect to="/home" />
              : <LoginForm handleLogin={this.handleLogin} />} />
          <Route
            exact path="/home"
            render={() => <Home />} />
        </div>
      </Router>
    );
  }
}

export default App;
