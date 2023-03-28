import React, { useEffect, useState } from "react";
import Posts from "../api/Posts";
import { useParams } from "react-router-dom";

import Loading from "../components/Loading";
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

  const getPost = async (post) => {
    try {
      setIsPending(true);
      const { data } = await Posts.get(post);

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
    setTitle(post?.title);
    setBody(post?.body);
  }, [post]);

  useEffect(() => {
    getPost(`/${slug}`);
  }, [slug]);
  return (
    <Form
    style = {{top: '10%'}}
    handleSubmit={handleSubmit}
      title={`Edit your post`}
      buttonText={"Update"}
      elements={[
        <Input handleInput={setTitle} name={"title"} style={{ width: "500px" }} value= {title} />,
        <FileInput
          post={{
            image: post.image,
            shape: post.image_shape,
          }}
          handleFile={setFile}
        />,
        <Input
          handleInput={setBody}
          value = {body}
          name = 'description'
          type="textarea"
          style={{ width: "500px"}}
        />
      ]}
    />
  );
}

// (
//   <>
//     {post && (
//       <form onSubmit={(e)=>{handleSubmit(e)}}
//         style={{
//           color: "white",
//         }}
//         className="home edit-post"
//       >
//         {isPending && <Loading />}

//         <div className="title-input input">
//           <label htmlFor="title">Title</label>
//           <input onChange={({target})=>{setTitle(target.value)}} type="text" name="title" value={title} />
//         </div>
//         <div>
//
//         <div className="body-input input">
//           <label htmlFor="body">Description</label>
//           <textarea onChange={({target})=>{setBody(target.value)}}
//             value={body}
//             name="body"
//             id="body"
//             cols="80"
//             rows="8"
//           ></textarea>
//         </div>

//         <div className="update">
//           <button>Update</button>
//         </div>
//       </form>
//     )}
//   </>
// );
