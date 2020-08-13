import React, { Component } from 'react';
import { render } from 'react-dom';
import SignIn from './SignIn.jsx';
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
    const currentForm = document.getElementById('loginForm')
    currentForm.reset();
    const data = {
      username,
      password,
    };
    fetch('/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(res => {
      if (typeof res === 'string') {
        alert(res);
      } else {
        document.getElementById('welcome_msg').innerHTML = `Welcome back ${this.state.username}!`;
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('updateForm').style.display = 'flex';
        document.getElementById('weight_container').style.display = 'flex';
        this.setState({
          ...this.state,
          weight_data: res.data,
        })
      }
    })
    .catch(err => console.log('error with the fetch: ', err));
  }

  updateData (date, newWeight) {
    const currentForm = document.getElementById('updateForm')
    currentForm.reset();
    const data   = {
      username: this.state.username,
      password: this.state.password,
      date,
      weight: newWeight,
    }
    fetch('/api/update/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(res => {
      if (typeof res === 'string') {
        alert(res);
      } else {
        this.setState({
          ...this.state,
          weight_data: res.data,
        })
      }
    })
    .catch(err => console.log('error with the fetch: ', err));
  }

  render() {
    return (
      <div>
        <div>
          <SignIn
            key={1}
            updateUser={this.updateUser}
            updatePassword={this.updatePassword}
            getData={this.getData}
            username={this.state.username}
            password={this.state.password}
          />
        </div>
        <div>
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
