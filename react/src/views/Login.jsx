import React, { useState } from "react";
import Form from "../components/Form";
import Input from "../components/Input";

export default function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("This works!");
  };

  return (
    <Form
      title={"Login"}
      handleSubmit={handleSubmit}
      buttonText={"Login!"}
      elements={[
        <Input name={"username"} />,

        <Input name={"password"} type="password" />,
      ]}
    />
  );
}
