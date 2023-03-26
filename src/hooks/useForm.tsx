import React from "react";


export function useForm(inputValues: { name?: string | undefined; email?: string | undefined; password?: string | undefined }) {
  const [values, setValues] = React.useState(inputValues);

  const handleChange = (event: { target: { value: any; name: any; }; }) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };
  return {values, handleChange, setValues};
}