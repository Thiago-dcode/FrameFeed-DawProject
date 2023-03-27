import React from "react";

import Users from "../api/Users";
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

  const getUser = async (userUrl) => {
    try {
      setIsPending(true);
      const { data } = await Users.get(userUrl);

      console.log(data);
      setUser(data);
    } catch (error) {
      console.log(error.message);
      setError(error);
    } finally {
      setIsPending(false);
    }
  };
  const handleDelete = ()=>{

    console.log(username)
  }
  useEffect(() => {
    getUser(`/${username}`);
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
            <EditDelete
            className={''}
            edit= {
             { content: 'Edit profile',
              url: `/users/${username}/edit`,}
            }
            del= {
              { content: 'Delete',
               method: handleDelete,}
             } />
          </header>
          <main>
            <div>
              <p>Posts <span>{`(${user.posts.length})`}</span></p>
            </div>
            <GalleryGrid posts={user.posts} />
          </main>
        </>
      )}
    </div>
  );
}
