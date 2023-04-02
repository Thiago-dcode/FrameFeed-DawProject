import React, { useEffect, useState } from "react";
import Api from "../api/Api";
import { useParams } from "react-router-dom";


import Form from "../components/Form";
import Input from "../components/Input";
import FileInput from "../components/FileInput";
import "../css/form.css";

export default function PostEdit() {
  const { slug } = useParams();
  const [post, setPost] = useState({});
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState(null);

  const getPost = async (post, controller) => {
    try {
      setIsPending(true);
      const { data } = await Api.get(post, {
        signal: controller.signal,
      });
      setTitle(data.title);
      setBody(data.body);

      setPost(data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsPending(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title);
    console.log(body);
    console.log(file);
  };

  useEffect(() => {
    const controller = new AbortController();
    getPost(`/posts/${slug}`, controller);

    return () => controller.abort();
  }, [slug]);
  return (
    <Form
      style={{ top: "10%" }}
      handleSubmit={handleSubmit}
      title={`Edit your post`}
      buttonText={"Update"}
      elements={[
        <Input
          handleInput={setTitle}
          name={"title"}
          style={{ width: "500px" }}
          value={title}
        />,
        <FileInput
        title={'Image'}
          prevImage={{
            image: post.image,
            shape: post.image_shape,
          }}
          handleFile={setFile}
        />,
        <Input
          handleInput={setBody}
          value={body}
          name="description"
          type="textarea"
          style={{ width: "500px" }}
        />,
      ]}
    />
  );
}

