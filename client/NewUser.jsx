import React from 'react';

const NewUser = ({ createUser, updateUser, updatePassword, username, password }) => {
  return (
    <div id="signupForm">
      <h4><strong>New Users Create an Account Here</strong></h4>
      <form
      id="signupForm_Form"
      onSubmit={(e) => {
        e.preventDefault();
        createUser(username, password);
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
        <input type="submit" value="Create Account" />
      </form>
    </div>
  )
};

export default NewUser;
