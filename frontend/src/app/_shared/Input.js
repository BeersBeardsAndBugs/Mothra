import React from "react";

export const Input = ({ input, handleOnChange }) => {
  return (
    <div className="inputField">
      <input
        className="input"
        type={input.type || "text"}
        placeholder={input.name}
        value={input.value}
        name={input.name}
        onChange={handleOnChange}
      />
      <div style={{ color: "red", fontSize: "1rem" }}>{input.error}</div>
    </div>
  );
};
