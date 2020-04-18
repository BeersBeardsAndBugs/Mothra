import React, { useState } from "react";
import { LoginForm } from "./loginForm";
import { SignupForm } from "./signupForm";
import { UserDashboard } from "./userDashboard";
import "./App.css";

export const App = () => {
  const [pageSelected, setPageSelected] = useState("homepage");

  const [user, setUser] = useState();

  return (
    <div className="App">
      <div className="container">
        {
          {
            login: <LoginForm {...{ setPageSelected, setUser }} />,
            homepage: <UserDashboard {...{ user, setUser, setPageSelected }} />,
            signup: <SignupForm {...{ setPageSelected, setUser }} />,
          }[pageSelected]
        }
      </div>
    </div>
  );
};
