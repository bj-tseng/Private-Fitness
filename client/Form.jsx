import React from 'react';

const Form = ({ updateUser, updatePassword, getData, username, password }) => {
  return (
    <div>
      <form
      id="loginForm"
      onSubmit={(e) => {
        e.preventDefault();
        getData(username, password);
      }}
      >
        <label htmlFor="user">Username: </label>
        <input
          type="text"
          id="user"
          onChange={(e) => updateUser(e.target.value)}
        />
        <label htmlFor="pass">Password: </label>
        <input
          type="password"
          id="pass"
          onChange={(e) => updatePassword(e.target.value)}
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  )
};

export default Form;
