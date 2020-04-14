import React, { useRef, useState } from "react";
import { post } from "../../utils";
import { CREATE_USER } from "../../constants";
import { useForm } from "../../hooks";
import { Input } from "../_shared";

export const SignupForm = ({ setPageSelected, setUser }) => {
  const EMAIL = "email";
  const PASSWORD = "password";
  const NAME = "name";
  const confirmPassword = useRef(null);
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(true);

  const inputsSchema = {
    [EMAIL]: {
      value: "",
      error: "",
      name: EMAIL,
      required: true,
      validator: {
        regEx: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+).([a-zA-Z]{2,5})$/,
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
    [NAME]: {
      value: "",
      error: "",
      name: NAME,
      required: true,
      validator: {
        regEx: /^[a-zA-z]{1,20}$/,
        error: "Your name must be 20 characters or less",
      },
    },
  };

  const doLogin = async (body, isSubmitDisabled) => {
    //Prevents user from double-clicking the submit button
    const error = (e) => {
      console.log(e);
    };
    const result = await post(CREATE_USER, body, error);
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
      Confirm Password
      <div className="inputField">
        <input
          className="input"
          ref={confirmPassword}
          placeholder="confirm password"
          name="confirm password"
          type="password"
          onBlur={() =>
            setIsPasswordConfirmed(
              confirmPassword.current.value === inputs[PASSWORD].value
            )
          }
        />
        {isPasswordConfirmed || (
          <div style={{ color: "red", fontSize: "1rem" }}>
            Passwords do not match.
          </div>
        )}
      </div>
      Name
      <Input {...{ input: inputs[NAME], handleOnChange }} />
      <div className="submitButton">
        <button
          type="submit"
          name="submit"
          className="btn"
          disabled={isSubmitDisabled || !isPasswordConfirmed}
          onClick={handleSubmit}
        >
          Sign Up
        </button>
      </div>
      <button
        className="login-signup-btn"
        onClick={() => setPageSelected("login")}
      >
        Log In
      </button>
    </form>
  );
};
