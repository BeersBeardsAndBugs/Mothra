import React from "react";
import { post } from "../../utils";
import { GET_USER } from "../../constants";
import { useForm } from "../../hooks";
import { Input } from "../_shared";

export const LoginForm = ({ setPageSelected, setUser }) => {
  const EMAIL = "email";
  const PASSWORD = "password";

  const inputsSchema = {
    [EMAIL]: {
      value: "",
      error: "",
      name: EMAIL,
      required: true,
      validator: {
        regEx: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+).([a-zA-Z]{2,5})$/,
        error: "Must be a valid email address.",
      },
    },
    [PASSWORD]: {
      value: "",
      error: "",
      type: "password",
      name: PASSWORD,
      required: true,
    },
  };

  const doLogin = async (body, isSubmitDisabled) => {
    //Prevents user from double-clicking the submit button
    const error = (e) => {
      console.log(e);
    };
    const result = await post(GET_USER, body, error);
    isSubmitDisabled(false);
    if (result) {
      setUser(result);
      setPageSelected("homepage");
    }
  };

  const { handleSubmit, handleOnChange, inputs, isSubmitDisabled } = useForm(
    inputsSchema,
    doLogin
  );

  return (
    <form className="loginForm" onSubmit={handleSubmit}>
      Log In
      <Input {...{ input: inputs[EMAIL], handleOnChange }} />
      Password
      <Input {...{ input: inputs[PASSWORD], handleOnChange }} />
      <div className="submitButton">
        <button
          type="submit"
          name="submit"
          className="btn"
          disabled={isSubmitDisabled}
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>
      <button
        className="login-signup-btn"
        onClick={() => setPageSelected("signup")}
      >
        Sign Up
      </button>
    </form>
  );
};
