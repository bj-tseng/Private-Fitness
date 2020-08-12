import React, { Component } from 'react';
import { render } from 'react-dom';
import Form from './Form.jsx';
import Data from './Data.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  this.updateUser = this.updateUser.bind(this);
  this.updatePassword = this.updatePassword.bind(this);
  this.getData = this.getData.bind(this);
  }

  updateUser(input) {
    this.setState({
      ...this.state,
      username: input,
    })
  }
  
  updatePassword(input) {
    this.setState({
      ...this.state,
      password: input,
    })
  }

  getData(username, password) {
    const userForm = document.getElementById('loginForm')
    userForm.reset();
    const data = {
      username,
      password,
    };
    fetch('/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(res => {
      if (res) {
        document.getElementById('welcome_msg').innerHTML = 'Welcome Back!';
        document.getElementById('login_form').style.display = 'none';
      };
    })
    .catch(err => console.log('error with the fetch: ', err));
  }

  render() {
    return (
      <div>
        <div id ="login_form">
          <Form
            key={1}
            updateUser={this.updateUser}
            updatePassword={this.updatePassword}
            getData={this.getData}
            username={this.state.username}
            password={this.state.password}
          />
        </div>
        <div>
          <Data />
        </div>
      </div>
    )
  }
}

export default App;
