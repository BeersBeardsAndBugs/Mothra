import React, { useState } from "react";
import { InputField, SubmitButton } from "./statelessComponents";
import UserStore from "../stores/UserStore";

export const LoginForm = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
    isButtonDisabled: false
  });
  /* Alex Note - delete before merge
    the useState could also be written as 
    
    const [username, setUsername] = useState({})
    const [password, setPassword] = useState({})
    const [isButtonDisabled, setIsButtonDisabled] = useState({})

    this give you separate "setState" functions for each piece of state.
    This is usally prefered incase you need to pass the function to another component it 
    wont give that component access to other state it shouldn't be able to touch
  */

  const setInputValue = (property, val) => {
    val = val.trim();
    if (val.length > 20) {
      //Cap Username at 20 chars. Should probably keep this in a constants file
      return;
    }
    setState({ ...state, [property]: val });
  };

  const resetForm = () => {
    setState({ ...state, username: "", password: "", isButtonDisabled: false });
  };

  /*  Alex Note - delete before merge

  */
  const doLogin = async () => {
    if (!state.username) {
      return;
    }
    if (!state.password) {
      return;
    }

    //Prevents user from double-clicking the submit button
    setState({ ...state, isButtonDisabled: true });

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
        console.log("Logging was a success"); // Alex Note - delete before merge
        /* Alex Note - delete before merge
          We should talk about what we intend to use for this. I'm thinking 
          it will be good for useContext hook. I dont think we need something like mobx for a 
          project of this size. I am open to discussing this though because I'm honestly not sure
          of the best practice here
        */
      } else {
        resetForm();
        alert("The login failed!");
      }
    } catch (e) {
      console.log(e);
      resetForm();
    }
  };

  return (
    <div className="loginForm">
      Log In
      <InputField
        type="text"
        placeholder="Username"
        value={state.username ? state.username : ""}
        onChange={val => setInputValue("username", val)}
      />
      Password
      <InputField
        type="password" // Tells browser to hide characters when typed
        placeholder="Password"
        value={state.password ? state.password : ""}
        onChange={val => setInputValue("password", val)}
      />
      <SubmitButton
        text="Login"
        disabled={state.isButtonDisabled}
        onClick={() => doLogin()}
      />
    </div>
  );
};
