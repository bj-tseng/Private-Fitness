import React, { Component } from 'react';
import { render } from 'react-dom';
import Form from './Form.jsx'

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
    console.log(this.state.username)
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
    
  }

  render() {
    return (
      <div>
        <Form
          key={1}
          updateUser={this.updateUser}
          updatePassword={this.updatePassword}
          getData={this.getData}
          username={this.state.username}
          password={this.state.password}
        />
      </div>
    )
  }
}

export default App;
