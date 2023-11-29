import { useEffect, useMemo, useState } from "react";

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [validations, setValidations] = useState({});

  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const handleFormChange = ({ target }) => {
    const { value, name } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormReset = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckedValues = {};

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage = "El campo es obligatorio"] =
        formValidations[formField];
      formCheckedValues[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;
    }

    setValidations(formCheckedValues);
  };

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(validations)) {
      if (validations[formValue] !== null) return false;
    }
    return true;
  }, [validations]);

  return {
    ...formState,
    formState,
    handleFormChange,
    handleFormReset,
    ...validations,
    validations,
    isFormValid,
  };
};
