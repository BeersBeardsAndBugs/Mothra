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
      name: TITLE,
      required: true,
    },
    [DESCRIPTION]: {
      value: "",
      error: "",
      name: TITLE,
      required: true,
    },
    [COMMENTS]: {
      value: "",
      error: "",
      name: TITLE,
      required: true,
    },[HISTORY]: {
      value: "",
      error: "",
      name: TITLE,
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
          <Input {...{ input: inputs[DESCRIPTION], handleOnChange}}>
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





// import React from "react";

// export const Name = ({prop}) => {
//     return (<div></div>);
// }

// import React from "react";
// import { useForm } from "hooks";

// export const Name = () => {
//   const PROPERTY_ONE = "Property One";

//   const inputsSchema = {
//     [PROPERTY_ONE]: { value: "", error: "" }
//   };

//   const validationSchema = {
//     [PROPERTY_ONE]: {
//       required: true,
//       validator: {
//         regEx: /^[a-zA-Z]*$/,
//         error: "Property One can only have letters"
//       }
//     },
   // [PROPERTY_TWO]: {
   //   required: true,
   //   validator: {
   //     regEx: /^[a-zA-Z]*$/,
   //     error: "Description can only have letters",
   //     dependencies: [
   //       {
   //         otherInput: PROPERTY_ONE,
   //         validate: (otherInputValue, thisValue) => {
   //           return thisValue.length > otherInputValue.length;
   //         },
   //         error: PROPERTY_TWO + " must be longer than " + PROPERTY_ONE
   //       }
   //     ]
   //   }
   // }
  // };

//   const onSubmitForm = async submitted => {
//     console.log(submitted)
//     // const response = await axios.post(path, body)
//     // Do something with result
//   };

//   const errorStyle = {
//     color: "red",
//     fontSize: "13px"
//   };

 

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor={PROPERTY_ONE}>
//             {`${PROPERTY_ONE}: `}
//             <input
//               type={PROPERTY_ONE}
//               name={PROPERTY_ONE}
//               onChange={
//                 handleInputChange
//               }
//               value={inputs[PROPERTY_ONE].value}
//               required
//             />
//           </label>
//           {inputs[PROPERTY_ONE].error && (
//             <p style={errorStyle}>{inputs[PROPERTY_ONE].error}</p>
//           )}
//         </div>

//         <button type="submit" name="submit" disabled={disable}>
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };
