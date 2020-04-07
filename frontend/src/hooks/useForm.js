import { useState, useEffect, useCallback } from "react";

export const useForm = (inputsSchema, onSubmit) => {
  const [inputs, setInputs] = useState(inputsSchema);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // In the initial render the submit button will be disabled
  useEffect(() => {
    setIsSubmitDisabled(true);
  }, []);

  // Check if inputs are currently valid. If not, disable submit
  useEffect(() => {
    if (isDirty) {
      setIsSubmitDisabled(!validateInputs());
    }
  }, [inputs, isDirty]);

  // Checks that all inputs are valid, and returns true only if they are.
  const validateInputs = useCallback(() => {
    const hasErrorInInputs = Object.keys(inputsSchema).some((key) => {
      const isInputFieldRequired = inputsSchema[key]?.required;
      const inputValue = inputs[key]?.value;
      const inputError = inputs[key]?.error;

      return (isInputFieldRequired && !inputValue) || inputError;
    });

    return !hasErrorInInputs;
  }, [inputs, inputsSchema]);

  // Change input value to match what was typed
  const handleOnChange = useCallback(
    (event) => {
      setIsDirty(true);

      const name = event.target.name;
      const value = event.target.value;

      let error = "";
      // set error if input is required and not filled in
      if (inputsSchema[name].required) {
        if (!value) {
          error = `${name} field is required`;
        }
      }

      // check that validator for the input being changed is an object in order to check its validator regex
      if (
        inputsSchema[name].validator !== null &&
        typeof inputsSchema[name].validator === "object"
      ) {
        // set error if validator regex fails
        if (value && !inputsSchema[name].validator.regEx.test(value)) {
          error = inputsSchema[name].validator.error;
        }
      }
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: { ...prevInputs[name], value, error },
      }));
    },
    [setInputs]
  );

  // if valid perform submit
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (validateInputs()) {
        setIsSubmitDisabled(true);
        const body = Object.keys(inputs)
          .map((key) => {
            return { [key]: inputs[key].value };
          })
          .reduce((accum = {}, keyObj) => {
            return { ...accum, ...keyObj };
          });

        onSubmit(body, setIsSubmitDisabled);
      }
    },
    [inputs]
  );

  return { handleSubmit, handleOnChange, inputs, isSubmitDisabled };
};
