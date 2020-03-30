import React from "react";

export const SubmitButton = ({ disabled, text, onClick }) => {
  return (
    <div className="submitButton">
      <button className="btn" disabled={disabled} onClick={() => onClick()}>
        {text}
      </button>
    </div>
  );
};
