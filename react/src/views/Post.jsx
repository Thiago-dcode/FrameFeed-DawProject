import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Posts from "../api/Posts";
import Likes from "../components/Likes";
import UserLink from "../components/UserLink";

import Loading from "../components/Loading";
import EditDelete from "../components/EditDelete";

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState({});
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState("");

  const getPost = async (post) => {
    try {
      setIsPending(true);
      const response = await Posts.get(post);

      setPost(response.data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsPending(false);
    }
  };

  const handleDelete = () => {};
  useEffect(() => {
    getPost(`/${slug}`);
  }, [slug]);

  return (
    <>
      {post && (
        <div className="home post">
          {isPending && <Loading />}

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
          {post && !isPending && (
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
          )}
        </div>
      )}
    </>
  );
}
