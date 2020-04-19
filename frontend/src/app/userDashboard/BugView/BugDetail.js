import React from "react";
import { useForm } from "../../../hooks";
import { Input } from "../../_shared";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  matTheme: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export const BugDetail = ({ visibleBug }) => {
  const TITLE = "title";
  const PRIORITY = "priority";
  const DESCRIPTION = "description";
  const COMMENTS = "comments";
  const HISTORY = "history";

  const inputsSchema = {
    [TITLE]: {
      value: visibleBug.title,
      error: "",
      name: TITLE,
      required: true,
    },
    [PRIORITY]: {
      value: visibleBug.priority,
      error: "",
      name: PRIORITY,
      required: true,
    },
    [DESCRIPTION]: {
      value: visibleBug.description,
      error: "",
      name: DESCRIPTION,
      required: true,
    },
    [COMMENTS]: {
      value: visibleBug.comments,
      error: "",
      name: COMMENTS,
      required: true,
    },
    [HISTORY]: {
      value: visibleBug.history,
      error: "",
      name: HISTORY,
      required: true,
    },
  };
  const formSubmit = () => {
    return true;
  };

  const { handleSubmit, handleOnChange, inputs, isSubmitDisabled } = useForm(
    inputsSchema,
    formSubmit
  );

  const handleOnBlur = () => {
    // do stuff when an input is clicked away from
  };
  // <select name="myDropdown" value={myDropdown} onChange={handleOnChange}>
  //     <option value=""></option>
  // </select>

  return (
    <div className="mdc-card">
      <form className="bugDetail_form" onSubmit={handleSubmit}>
        <h1>{visibleBug.title}</h1>
        <h3>Priority</h3>
        <Input {...{ input: inputs[PRIORITY], handleOnChange }} />
        <h3>Description</h3>
        <Input {...{ input: inputs[DESCRIPTION], handleOnChange }} />
        <h3>Date Created: {visibleBug.dateCreated}</h3>
        <h3>Created By: {visibleBug.createdBy}</h3>
        <h3>Status: {visibleBug.status}</h3>
        <div>{visibleBug.attachments}</div>
        {/* <h3>Comments</h3>
        <Input {...{ input: inputs[COMMENTS], handleOnChange }} /> */}
        <h3>History</h3>
        <Input {...{ input: inputs[HISTORY], handleOnChange }} />
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
};
