import React, { useEffect } from "react";
import { LoginForm } from "./loginForm";
import "./App.css";

const App = () => {
  // placeholder until we settle how to do this
  const UserStore = { isLoggedIn: false, loading: false };

  // Similar to Angular's NgOnChanges(). Will Re-Render every time specified values change
  useEffect(() => {
    // Mock for an API call that can check if the user is already logged in
    try {
      // let res = await fetch('/isLoggedIn', {
      //   method: 'post',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json'
      //   }
      // });

      // let result = await res.json();
      if (UserStore.isLoggedIn) {
        UserStore.loading = false;
      } else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    } catch (e) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
  }, [UserStore.isLoggedIn]);

  if (UserStore.loading) {
    return (
      <div className="App">
        <div className="container">Loading, please wait...</div>
      </div>
    );
  } else if (UserStore.isLoggedIn) {
    return (
      <div className="App">
        <div className="container">
          Welcome {UserStore.username ? UserStore.username : "No Name Found"}
          
          Show dashboard or something else here
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <div className="container">
          <LoginForm></LoginForm>
        </div>
      </div>
    );
  }
};
export default App;
