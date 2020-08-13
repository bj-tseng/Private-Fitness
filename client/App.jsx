import React, { Component } from 'react';
import SignIn from './SignIn.jsx';
import Data from './Data.jsx';
import Update from './Update.jsx';
import NewUser from './NewUser.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      date: '',
      weight: 0,
      weight_data: [],
      styleOne: {},
      styleTwo: {},
    }
  this.updateUser = this.updateUser.bind(this);
  this.updatePassword = this.updatePassword.bind(this);
  this.updateDate = this.updateDate.bind(this);
  this.updateWeight = this.updateWeight.bind(this);
  this.getData = this.getData.bind(this);
  this.updateData = this.updateData.bind(this);
  this.createUser = this.createUser.bind(this);
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

  createUser(username, password) {
    const currentForm = document.getElementById('signupForm_Form')
    currentForm.reset();
    if (!username || !password) {
      this.setState({
        ...this.state,
        username: '',
        password: '',
      });
      alert('Missing username and/or password')
    } else {
      const data   = {
        username, 
        password,
      };
      fetch('/api/create/', {
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
          document.getElementById('welcome_msg').innerHTML = `Welcome ${this.state.username}!`;
          document.getElementById('loginForm').style.display = 'none';
          document.getElementById('signupForm').style.display = 'none';
          document.getElementById('weight_container').style.display = 'flex';
          console.log(res.msg);
          this.setState({
            ...this.state,
            weight_data: res.data,
            styleOne: {
              'display': 'flex',
              'flex-direction': 'column',
              'align-items': 'center',
              'justify-content': 'center',
            }
          })
        }
      })
      .catch(err => console.log('error with the fetch: ', err));
    }
  }

  getData(username, password) {
    const currentForm = document.getElementById('loginForm_Form')
    currentForm.reset();
    if (!username || !password) {
      this.setState({
        ...this.state,
        username: '',
        password: '',
      })
      alert('Missing username and/or password')
    } else {
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
          document.getElementById('signupForm').style.display = 'none';
          document.getElementById('weight_container').style.display = 'flex';
          console.log(res.msg);
          this.setState({
            ...this.state,
            weight_data: res.data,
            styleOne: {
              'display': 'flex',
              'flex-direction': 'column',
              'align-items': 'center',
              'justify-content': 'center',
            }
          })
        }
      })
      .catch(err => console.log('error with the fetch: ', err));
    }
  }

  updateData (date, newWeight) {
    const currentForm = document.getElementById('updateForm')
    currentForm.reset();
    if (!date || !newWeight) {
      this.setState({
        ...this.state,
        date: '',
        weight: 0,
      })
      alert('Missing information to properly update database')
    } else {
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
          console.log(res.msg);
          this.setState({
            ...this.state,
            weight_data: res.data,
          })
        }
      })
      .catch(err => console.log('error with the fetch: ', err));
    }
  }

  render() {
    return (
      <div>
        <div>
          <NewUser
            key={1}
            createUser={this.createUser}
            updateUser={this.updateUser}
            updatePassword={this.updatePassword}
            username={this.state.username}
            password={this.state.password}
          />
        </div>
        <div>
          <SignIn
            key={2}
            getData={this.getData}
            updateUser={this.updateUser}
            updatePassword={this.updatePassword}
            username={this.state.username}
            password={this.state.password}
          />
        </div>
        <div>
          <Update
            key={3}
            updateData={this.updateData}
            updateDate={this.updateDate}
            updateWeight={this.updateWeight}
            date={this.state.date}
            weight={this.state.weight}
            style={this.state.styleOne}
          />
        </div>
        <div>
          <Data key={4} weight_data={this.state.weight_data} style={this.state.styleOne}/>
        </div>
      </div>
    )
  }
}

export default App;
