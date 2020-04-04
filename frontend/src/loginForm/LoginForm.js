import React, { useState } from "react";

export const LoginForm = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const setInputValue = (property, val) => {
    val = val.trim();
    if (val.length > 20) {
      //Cap Username at 20 chars. Should probably keep this in a constants file
      return;
    }
    setUsername({ username: val});
  };

  const resetForm = () => {
    setUsername({ username: ""});
    setPassword({ password: ""});
    setIsButtonDisabled({ isButtonDisabled: false});
  };

  const doLogin = async () => {
    if (!username) {
      return;
    }
    if (!password) {
      return;
    }

    //Prevents user from double-clicking the submit button
    setIsButtonDisabled({ isButtonDisabled: true});

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
        setIsButtonDisabled({ isButtonDisabled: true});
        setUsername({ username: "USER_NAME" });
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
      <div className="inputField">
        <input
          className="input"
          type="text"
          placeholder="Username"
          value={username ? username : ""}
          onChange={val => setInputValue("username", val)}
        />
      </div>

      Password
      <div className="inputField">
        <input
          className="input"
          type="password" // Tells browser to hide input
          placeholder="Password"
          value={password ? password : ""}
          onChange={val => setInputValue("password", val)}
        />
      </div>

    <div className="submitButton">
      <button className="btn" disabled={isButtonDisabled} onClick={() => doLogin()}>
        Login
      </button>
    </div>

    </div>
  );
};
