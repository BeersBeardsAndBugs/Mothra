import React from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import UserStore from './stores/UserStore';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      buttonDisabled: false
    }
  }

  setInputValue(property, val) {
    val = val.trim();
    if (val.length > 20) { //Cap Username at 20 chars. Should probably keep this in a constants file
      return;
    }
    this.setState({
      [property]: val
    })
  }

  resetForm() {
    this.setState({
      username: '',
      password: '',
      buttonDisabled: false
    })
  }


  /**
   * User selects "Log In" Button after entering name and password
   */
  async doLogin() {
    if (!this.state.username) {
      return;
    }
    if (!this.state.password) {
      return;
    }

    //Prevents user from double-clicking the submit button
    this.setState({
      buttonDisabled: true
    })
  
    try {
      // What a POST request might look like after the user selects "Log In" button
      // let res = await fetch('/login', {
      //   method: 'post',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     username: this.state.username,
      //     password: this.state.password
      //   })
      // });
      //let result = await res.json();

      /**
       * Since we dont have a backend right now, I'm just going to mock a response for success
       */

      let result = "success";
      
      if (result === "success") {
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      }

      else {
        this.resetForm();
        alert("The login failed!");
      }
    }

    catch(e) {
      console.log(e);
      this.resetForm();
    }
  }

  render() {
  return (
    <div className="loginForm">

    Log In
    <InputField 
      type = 'text'
      placeholder = 'Username'
      value = {this.state.username ? this.state.username : ""}
      onChange = { (val) => this.setInputValue('username', val) }
    />
    Password
    <InputField 
      type = 'password' // Tells browser to hide characters when typed
      placeholder = 'Password'
      value = {this.state.password ? this.state.password : ""}
      onChange = { (val) => this.setInputValue('password', val) }
    />

    <SubmitButton
      text = 'Login'
      disabled = {this.state.buttonDisabled}
      onClick = { () => this.doLogin()}
    />

    </div>
  );
}
}

export default LoginForm;