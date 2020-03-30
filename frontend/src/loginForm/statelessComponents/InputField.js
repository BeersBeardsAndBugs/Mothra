import React from "react";

export const InputField = ({ type, placeholder, value, onChange }) => {
  return (
    <div className="inputField">
      {/* Alex Note - delete before merge 
       In the current state of this input, it doesnt really warrant having its own component. 
       If there were a lot more going on with it I could see it needing it 
       e.g. Including the label, validation, and validation error */}
      <input
        className="input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
};
