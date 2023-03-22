import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as lightHeart } from "@fortawesome/free-regular-svg-icons";

export default function PostCard({ post }) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  return (
    <article
      onMouseLeave={() => setIsMouseOver(false)}
      onMouseOver={() => setIsMouseOver(true)}
      style={{ backgroundImage: `url(${post.image})` }}
      className={`post-card ${
        post.image_shape === "vertical" ? "card-tall" : "card-wide"
      }`}
    >
      <div
        style={{
          display: `${isMouseOver ? "flex" : "none"}`,
        }}
        className={`author-like`}
      >
        <h3>@{post.author.username}</h3>
        <div className="like-component">
          <FontAwesomeIcon icon={lightHeart} />
          <p>{post.likes.length}</p>
        </div>
      </div>

      <div
        style={{
          display: `${isMouseOver ? "flex" : "none"}`,
        }}
        className={`title`}
      >
        <h2>{post.title}</h2>
      </div>
    </article>
  );
}
