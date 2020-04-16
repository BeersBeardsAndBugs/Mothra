import React from 'react';
import {bug} from "./jsondata"
import { post } from "../../../utils";
import { GET_USER } from "../../../constants";
import { useForm } from "../../../hooks";
import { Input } from "../../_shared";

export const BugDetail = () => {
  const TITLE = "title"
  const PRIORITY = "priority"
  const DESCRIPTION = "description"
  const COMMENTS = "comments"
  const HISTORY = "history"

  const inputsSchema = {
    [TITLE]: {
      value: "",
      error: "",
      name: TITLE,
      required: true,
    },
    [PRIORITY]: {
      value: "",
      error: "",
      name: PRIORITY,
      required: true,
    },
    [DESCRIPTION]: {
      value: "",
      error: "",
      name: DESCRIPTION,
      required: true,
    },
    [COMMENTS]: {
      value: "",
      error: "",
      name: COMMENTS,
      required: true,
    },[HISTORY]: {
      value: "",
      error: "",
      name: HISTORY,
      required: true,
    },
  };
  const formSubmit = () => {
    return true
  }

  const { handleSubmit, handleOnChange, inputs, isSubmitDisabled } = useForm(
    inputsSchema,
    formSubmit
  );

  const handleOnBlur = () => {
    // do stuff when an input is clicked away from 
  }
    // <select name="myDropdown" value={myDropdown} onChange={handleOnChange}>
    //     <option value=""></option>
    // </select>

    return (
      <div>
        <form className="bugDetail_form" onSubmit={handleSubmit}>
          <h1>{bug.title}</h1>
          <h3>Priority</h3>
          <Input {...{ input: inputs[PRIORITY], handleOnChange }}/>
          <h3>Description</h3>
          <Input {...{ input: inputs[DESCRIPTION], handleOnChange}}/>
          <h3>Date Created: {bug.dateCreated}</h3>
          <h3>Created By: {bug.createdBy}</h3>
          <h3>Status: {bug.status}</h3>
          <div>{bug.attachments}</div>
          <h3>Comments</h3>
          <Input {...{ input: inputs[COMMENTS], handleOnChange}}/>
          <h3>History</h3>
          <Input {...{ input: inputs[HISTORY], handleOnChange}}/>
          <button
            type="submit"
            name="submit"
            className="btn"
            onClick={handleSubmit}
          >
          Save Changes
          </button>
        </form>
{/* <input value={inputs.title} onChange={ handleOnChange} onBlur={handleOnBlur}/> */}
    </div> 
    );

}

