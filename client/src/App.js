import React, { Component } from 'react';
import { Message, Icon, Menu } from 'semantic-ui-react'

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
      error: false,
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
      if (res.errors) {
        this.setState({ error: true })
      } else {
      Auth.authenticateToken(res.token);
      this.setState({
        auth: Auth.isUserAuthenticated(),
      });
    }})
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
      if (res.errors){
        this.setState({ error: true})
      } else {
      Auth.authenticateToken(res.token);
      this.setState({
        auth: Auth.isUserAuthenticated(),
      });
    }})
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
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    let message = <Message attached='bottom' warning>
      <Icon name='warning circle' />
      Something went wrong! Please try again.
    </Message>

    return (
      <Router>
        <div className="App">
          {this.state.error ? message : null}

          <Menu className="navBar" inverted fixed="bottom">
            <Menu.Menu position='right'>
            <Menu.Item name='login' as={Link} to='/login' />
            <Menu.Item name='register' as={Link} to='/register' />
            <Menu.Item name='home' as={Link} to='/home' />
            <Menu.Item name='logout' onClick={this.handleLogout} />
            </Menu.Menu>
          </Menu>

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
            render={() => (this.state.auth)
              ? <Home />
              : <Redirect to="/login" />} />
        </div>
      </Router>
    );
  }
}

export default App;
