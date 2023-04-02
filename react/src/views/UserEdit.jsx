import React, { useEffect, useState } from "react";
import Api from "../api/Api";
import { useParams } from "react-router-dom";

import Form from "../components/Form";
import Input from "../components/Input";
import FileInput from "../components/FileInput";
import "../css/form.css";

export default function PostEdit() {
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [_username, setUsername] = useState("");
  const [file, setFile] = useState(null);

  const getUser = async (post, controller) => {
    try {
      setIsPending(true);
      const { data } = await Api.get(post, {
        signal: controller.signal,
      });
      setName(data.name);
      setUsername(data.username);

      setUser(data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsPending(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
    console.log(_username);
    console.log(file);
  };

  useEffect(() => {
    const controller = new AbortController();
    getUser(`/users/${username}`, controller);

    return () => controller.abort();
  }, [username]);
  return (
    <Form
      style={{ top: "10%" }}
      handleSubmit={handleSubmit}
      title={`Edit your profile`}
      buttonText={"Update"}
      elements={[
        <Input
          handleInput={setName}
          name={"Name"}
          style={{ width: "500px" }}
          value={name}
        />,
        <FileInput
          prevImage={{
            image: user.avatar,
            shape: "avatar",
          }}
          handleFile={setFile}
        />,
        <Input
          handleInput={setUsername}
          value={_username}
          name="Username"
          style={{ width: "500px" }}
        />,
      ]}
    />
  );
}
