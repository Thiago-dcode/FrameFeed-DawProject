import React, { useState } from "react";
import Form from "../components/Form";
import Input from "../components/Input";

import Api from "../api/Api";
import { useEffect } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPassWordConfirmation] = useState("");
  const [isPending, setIspending] = useState(false);
  const [error, setError] = useState(null);

  const newUser = async (formData, controller) => {
    try {
      setError("");
      setIspending(true);
      const res = await Api.post("/register", formData, {
        signal: controller.signal,
      });
      console.log(res.data);
    } catch (error) {
      if (error.response.status === 422) {
        setError(error.response.data.errors);
      } else {
        console.log(error);
      }
    } finally {
      setIspending(false);
    }
  };

  const handleSubmit = (e) => {
    const controller = new AbortController();
    e.preventDefault();
    const formData = {
      name,
      username,
      email,
      password,
      passwordConfirmation,
    };
    newUser(formData, controller);

    return () => controller.abort();
  };

  useEffect(() => {
    setError("");
  }, [name, username, email, password, passwordConfirmation]);

  return (
    <Form
      title={"Register"}
      handleSubmit={handleSubmit}
      buttonText={"Register!"}
      isPending={isPending}
      errors={error}
      elements={[
        <Input handleInput={setName} valueInput={name} name={"name"} />,
        <Input
          handleInput={setUsername}
          valueInput={username}
          name={"username"}
        />,
        <Input
          handleInput={setEmail}
          valueInput={email}
          name={"email"}
          type="email"
        />,
        <Input
          handleInput={setPassword}
          valueInput={password}
          name={"password"}
          type="password"
        />,
        <Input
          handleInput={setPassWordConfirmation}
          valueInput={passwordConfirmation}
          name={"password-confirmation"}
          content={"password confirmation"}
          placeholder={"Confirm your password"}
          type="password"
        />,
      ]}
    />
  );
}
