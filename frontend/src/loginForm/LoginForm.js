import React, { useState } from "react";
import { post, get } from "../utils";
import { GET_USER } from "../constants";
import { useForm } from "../hooks";
import { Input } from "./input";

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
        regEx: /^[a-zA-z0-9@.]{3,20}$/,
        error:
          "The EMAIL can only have letters and numbers, and must be 3-20 characters long.",
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
      setPageSelected("homepage");
      setUser(result);
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
    </form>
  );
};
