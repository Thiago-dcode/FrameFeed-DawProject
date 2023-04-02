import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import Api from "../api/Api";
import Likes from "../components/Likes";
import UserLink from "../components/UserLink";

import Loading from "../components/Loading";
import EditDelete from "../components/EditDelete";
import LinkBroken from "../components/LinkBroken";

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState({});
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState("");

  const getPost = async (url, signal) => {
    try {
      setIsPending(true);
      const response = await Api.get(url,{signal} );

      setPost(response.data);
    } catch (error) {
      console.log(error.message);
      setError(error);
    } finally {
      setIsPending(false);
    }
  };
  const postDelete = async () => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDelete = () => {
    postDelete();
  };
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    getPost(`/posts/${slug}`, signal);
    
   
  }, [slug]);

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
                  <form action="">
                    <div className="avatar-input">
                      <div className="avatar">
                        <img src={post.author.avatar} alt="" />
                      </div>
                      <div className="input">
                        <input
                          type="text"
                          placeholder={`Add a comment to a ${post.author.username} post.`}
                        />
                      </div>
                    </div>

                    <button>Comment</button>
                  </form>
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
                            {comment && (
                              <Likes
                                className={"comment-like"}
                                numLikes={comment.likes.length}
                              />
                            )}
                          </article>
                        );
                      })}
                  </div>
                </section>
              )}

              <EditDelete
                className={"post-edit-delete"}
                edit={{
                  content: "Edit post",

                  url: `/posts/${slug}/edit`,
                }}
                del={{
                  content: "Delete",
                  method: handleDelete,
                }}
              />
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
