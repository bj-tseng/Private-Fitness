import React, { Component } from 'react';
import { render } from 'react-dom';
import Form from './Form.jsx';
import Data from './Data.jsx';
import Update from './Update.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      date: '',
      weight: 0,
      weight_data: [],
    }
  this.updateUser = this.updateUser.bind(this);
  this.updatePassword = this.updatePassword.bind(this);
  this.updateDate = this.updateDate.bind(this);
  this.updateWeight = this.updateWeight.bind(this);
  this.getData = this.getData.bind(this);
  this.updateData = this.updateData.bind(this);
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

  updateDate(input) {
    this.setState({
      ...this.state,
      date: input,
    })
  }

  updateWeight(input) {
    this.setState({
      ...this.state,
      weight: input,
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
        document.getElementById('update_form').style.display = 'flex';
        this.setState({
          ...this.state,
          weight_data: res,
        })
      };
    })
    .catch(err => console.log('error with the fetch: ', err));
  }

  updateData (date, newWeight) {
    console.log('username: ', this.state.username);
    console.log('password: ', this.state.password);
    console.log('date: ', date)
    console.log('weight: ', newWeight)
    // Need to make another post request & update the weight data
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
        <div id="update_form">
          <Update
            key={2}
            updateDate={this.updateDate}
            updateWeight={this.updateWeight}
            updateData={this.updateData}
            date={this.state.date}
            weight={this.state.weight}
          />
        </div>
        <div>
          <Data key={3} weight_data={this.state.weight_data}/>
        </div>
      </div>
    )
  }
}

export default App;
