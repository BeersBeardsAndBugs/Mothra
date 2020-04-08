import React, { useState } from "react";
import { LoginForm } from "./loginForm";
import { SignupForm } from "./signupForm";
import "./App.css";

export const App = () => {
  const [pageSelected, setPageSelected] = useState("login");

  const [user, setUser] = useState();

  const Homepage = ({ user }) => (
    <div>{user ? user.name + "'s " : ""}Homepage</div>
  );

  return (
    <div className="App">
      <div className="container">
        {
          {
            login: <LoginForm {...{ setPageSelected, setUser }} />,
            homepage: <Homepage {...{ user }} />,
            signup: <SignupForm {...{ setPageSelected, setUser }} />,
          }[pageSelected]
        }
      </div>
    </div>
  );
};
