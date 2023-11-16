import { useState } from "react";

export const useForm = (initialForm = {}) => {
  const [formState, setFormState] = useState(initialForm);

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

  return {
    ...formState,
    formState,
    handleFormChange,
    handleFormReset,
  };
};
