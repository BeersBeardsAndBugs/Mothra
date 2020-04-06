import React, { useState } from "react";
import { post, get } from "../utils";
import { GET_USER } from "../constants/";

export const LoginForm = ({ setPageSelected, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const setInputValue = (property, val) => {
    val = val.trim();
    if (val.length > 20) {
      //Cap Username at 20 chars. Should probably keep this in a constants file
      return;
    }
    setUsername(val);
  };

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setIsButtonDisabled(false);
  };

  const doLogin = async (e) => {
    e.preventDefault();

    setPageSelected("homepage");
    if (!username) {
      return;
    }
    if (!password) {
      return;
    }
    //Prevents user from double-clicking the submit button
    setIsButtonDisabled(true);
    const body = { email: username, password };

    const result = await post(GET_USER, body, error);
    setUser(result);

    const error = (e) => {
      resetForm();
      console.log(e);
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
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        Password
        <div className="inputField">
          <input
            className="input"
            type="password" // Tells browser to hide input
            placeholder="Password"
            name="password"
            value={password ? password : ""}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="submitButton">
          <button
            type="submit"
            name="submit"
            className="btn"
            disabled={isButtonDisabled}
            onClick={doLogin}
          >
            Login
          </button>
        </div>
      </div>
    );
  };
};
