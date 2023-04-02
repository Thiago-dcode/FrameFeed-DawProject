import React from "react";

import Api from "../api/Api";
import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import EditDelete from "../components/EditDelete";
import Loading from "../components/Loading";
import GalleryGrid from "../components/GalleryGrid";
export default function User() {
  const { username } = useParams();

  const [user, setUser] = useState({});
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState("");
  const [isActive, SetIsActive] = useState(false);
  const [isProfile, setIsProfile] = useState(false);

  const getUser = async (userUrl) => {
    try {
      setIsProfile(false);
      setIsPending(true);
      const { data } = await Api.get(userUrl);

      setUser(data);
    } catch (error) {
      console.log(error.message);
      setError(error);
    } finally {
      setIsPending(false);
    }
  };
  const handleDelete = () => {
    console.log(username);
  };
  useEffect(() => {
    if (!user) return;
    const userLoggedIn = JSON.parse(window.localStorage.getItem("user"));
    const token = window.localStorage.getItem("ACCESS_TOKEN");
    if (!userLoggedIn || !token) return;
    if (token && user.id === userLoggedIn.id) {
      console.log(token);
      setIsProfile(true);
    }
  }, [user]);

  useEffect(() => {
    getUser(`/users/${username}`);
  }, [username]);

  return (
    <div
      style={{
        color: "white",
      }}
      className="home"
    >
      {isPending && <Loading />}
      {user && !isPending && (
        <>
          <header className="user-header">
            <div className="image-info">
              <div className="image">
                <img src={user.avatar} alt="" />
              </div>

              <div className="info">
                <div className="username">
                  <h2>{user.username}</h2>
                  <p>
                    <span>{user.name}</span>
                  </p>
                </div>
              </div>
            </div>
            {isProfile ? (
              <EditDelete
                className={""}
                edit={{
                  content: "Edit profile",
                  url: `/users/${username}/edit`,
                }}
                del={{ content: "Delete", method: handleDelete }}
              />
            ) : null}
          </header>
          <main>
            <div>
              <p>
                Posts <span>{`(${user.posts.length})`}</span>
              </p>
            </div>
            <GalleryGrid posts={user.posts} />
          </main>
        </>
      )}
    </div>
  );
}
