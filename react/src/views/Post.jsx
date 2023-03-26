import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Posts from "../api/Posts";
import Likes from "../components/Likes";
import UserLink from "../components/UserLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import DropDownMenu from "../components/DropDownMenu";

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState({});
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState("");
  const [isActive, SetIsActive] = useState(false);

  const getPost = async (post) => {
    try {
      setIsPending(true);
      const response = await Posts.get(post);

      console.log(response.data);
      setPost(response.data);
    } catch (error) {
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
      {post && post.likes_count && post.author && (
        <div className="home post">
          <DropDownMenu
            Icon={
              <FontAwesomeIcon className="icon" icon={faEllipsis} style={{ color: "#ffffff" }} />
            }
            elements={[
              {
                content: "Edit post",
                url: `/posts/${post.slug}/edit`,
                isDelete: false,
              },
              { content: "delete post", url: `/posts/${post.slug}/` },
            ]}
          />
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
        </div>
      )}
    </>
  );
}
