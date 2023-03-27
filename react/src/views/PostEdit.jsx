import React, { useEffect, useState } from "react";
import Posts from "../api/Posts";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

export default function PostEdit() {
  const { slug } = useParams();
  const [post, setPost] = useState({});
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState("");

  const getPost = async (post) => {
    try {
      setIsPending(true);
      const { data } = await Posts.get(post);

      setPost(data);

      console.log(data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    getPost(`/${slug}`);
  }, [slug]);
  return (
    <>
      {post && (
        <form
          style={{
            color: "white",
          }}
          className="home post edit-post"
        >
          {isPending && <Loading />}

          <div className="title-input">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" value={post.title} />
          </div>
          <div>
            <div className="image-div">
              <div className="image-input">
                <label htmlFor="image">Image</label>
                <input name="image" id="image" type="file" />
              </div>
              <div>
                <div className={"img " + post.image_shape}>
                  <img src={post.image} alt="" />
                </div>
              </div>
            </div>
            <div className="body-input">
              <label htmlFor="body">Description</label>
                <textarea value={post.body} name="body" id="body" cols="30" rows="10"></textarea>
            </div>
          </div>

          <div>
            <button>Update</button>
          </div>
        </form>
      )}
    </>
  );
}
