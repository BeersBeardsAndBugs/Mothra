import React, { useEffect } from "react";
// import { observer } from "mobx-react";
// import UserStore from "./stores/UserStore";
import { LoginForm } from "./loginForm";
// import SubmitButton from "./SubmitButton";
import "./App.css";

const App = () => {
  // placeholder until we settle how to do this
  const UserStore = { isLoggedIn: false, loading: false };

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

  const doLogout = async () => {
    try {
      // What a POST Request may look like when user logs out
      // let res = await fetch('/logout', {
      //   method: 'post',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-type': 'application/json'
      //   }
      // });
      //let result = await res.json();

      // Mocking successful response for logging out until we have a backend
      let result = "success";

      if (result === "success") {
        UserStore.isLoggedIn = false;
        UserStore.username = "";
      }
    } catch (e) {
      console.log("There was an error logging out user: " + UserStore.username);
    }
  };
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
          {/* <SubmitButton
            text={"Log out"}
            disabled={false}
            onClick={() => this.doLogout()}
          /> */}
          {/* Alex Note - delete before merge 
            I think this should redirect to their dashboard, and the logout should be a global button in our navbar/menu or w/e
          */}
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
// export default observer(App);
export default App;
