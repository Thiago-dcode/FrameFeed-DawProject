import React, { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import Api from "../api/Api";
import Likes from "../components/Likes";
import UserLink from "../components/UserLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Loading from "../components/Loading";
import EditDelete from "../components/EditDelete";
import LinkBroken from "../components/LinkBroken";

export default function Post() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { slug } = useParams();
  const [post, setPost] = useState({});
  const [comment, setComment] = useState("");
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState("");

  const getPost = async (url, signal) => {
    try {
      setIsPending(true);
      const response = await Api.get(url, { signal });

      setPost(response.data);
    } catch (error) {
      console.log(error.message);
      setError(error);
    } finally {
      setIsPending(false);
    }
  };
  const deletePost = async () => {
    try {
      const { data } = await Api.delete("/posts/" + post.slug);
      console.log(data);
      return navigate("/" + user.username);
    } catch (error) {
      console.log(error.message);
    }
  };
  const storePost = async (formData) => {
    try {
      const { data } = await Api.post("/comment", formData);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDelete = (e, isYes) => {
    e.preventDefault();
    if (!isYes) return;
    deletePost();
  };

  const handleComment = (e) => {
    e.preventDefault();
    if(!comment) return;
    const formData = {
      user_id: user.id,
      post_id: post.id,
      comment,
    };
    console.log(formData)
  };
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    getPost(`/posts/${slug}`, signal);
  }, [slug]);

  useEffect(() => {
    const userLocalStorage = JSON.parse(window.localStorage.getItem("user"));

    setUser(userLocalStorage);
  }, []);

  return (
    <>
      {post && (
        <div className="home post">
          {isPending && !error ? <Loading /> : null}

          {Object.keys(post).length !== 0 && !isPending && !error ? (
            <>
              <header className="title">
                <h1>{post.title}</h1>
              </header>
              <main>
                <div className="img-user-like">
                  {post.image && (
                    <div className={"img " + post.image_shape}>
                      <img src={post.image} alt="" />
                    </div>
                  )}
                  <div className="category">
                    {post.categories.map((category, i) => (
                      <p key={i}>{category.name}</p>
                    ))}
                  </div>

                  {post.author && (
                    <div className="user-like">
                      <UserLink user={post.author} />
                      {post.likes_count && (
                        <Likes
                          className={"post-like"}
                          numLikes={post.likes_count}
                        />
                      )}
                    </div>
                  )}
                </div>
                <div className="body">
                  <p>{post.body}</p>
                </div>
              </main>
              {post.author && post.comments && (
                <section className="comments">
                  {user ? (
                    <form
                      onSubmit={(e) => {
                        handleComment(e);
                      }}
                    >
                      <div className="avatar-input">
                        <div className="avatar">
                          <img src={user.avatar} alt="" />
                        </div>
                        <div className="input">
                          <input
                            onChange={({ target }) => {
                              setComment(target.value);
                            }}
                            value={comment}
                            type="text"
                            placeholder={`Add a comment to a ${post.author.username} post.`}
                          />
                        </div>
                      </div>

                      <button>Comment</button>
                    </form>
                  ) : (
                    <div style={{ color: "white" }}>
                      <NavLink to={"/login"}>Login</NavLink>
                      <p>or</p>
                      <NavLink to={"/register"}>Register</NavLink>
                      <p>to comment.</p>
                    </div>
                  )}
                  <div className="comments-section">
                    {post.comments &&
                      post.comments.map((comment, i) => {
                        return (
                          <article key={i} className="">
                            <div className="user-comment">
                              {comment.author.avatar && (
                                <UserLink user={comment.author} />
                              )}
                              <p className="comment">{comment.comment}</p>
                            </div>
                            <div>
                              {comment && (
                                <Likes
                                  className={"comment-like"}
                                  numLikes={comment.likes.length}
                                />
                              )}

                              {user?.id === comment.author.id && (
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  style={{ color: "#ffffff" }}
                                />
                              )}
                            </div>
                          </article>
                        );
                      })}
                  </div>
                </section>
              )}

              {user?.id === post.author.id && (
                <EditDelete
                  PopUpContent={
                    "This action will delete the post forever, continue?"
                  }
                  classNameForm={"post-page"}
                  handleSubmit={handleDelete}
                  className={"post-edit-delete"}
                  edit={{
                    content: "Edit post",

                    url: `/posts/${slug}/edit`,
                  }}
                  del={{
                    content: "Delete",
                  }}
                />
              )}
            </>
          ) : null}
          {(Object.keys(post).length === 0 && !isPending) || error ? (
            <LinkBroken />
          ) : null}
        </div>
      )}
    </>
  );
}
