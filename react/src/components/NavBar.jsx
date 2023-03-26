import React from "react";
import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import UserLink from "./UserLink";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUserCircle } from "@fortawesome/free-solid-svg-icons";

import Users from "../api/Users";
import logo from "../assets/images/FrameFeed.png";

export default function NavBar() {
  const [users, setUsers] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const fetchUsers = async (url) => {
    try {
      setIsPending(true);
      const response = await Users.get(url);

      setUsers(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (search) {
      fetchUsers(`?user=${search}`);
    }
  }, [search]);
  return (
    <nav>
      <ul>
        <li className="logo">
          <NavLink to={"/"}>
            {" "}
            <img src={logo} alt="" />
          </NavLink>
        </li>
        <li className="search">
          <div className="input">
            <input
              onFocus={() => setIsFocus(true)}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="text"
              placeholder="Search for an author"
            />
          </div>
          {search && isFocus && (
            <div onMouseOver={() => setIsFocus(true)} className="list">
              {isPending && !error && <Loading />}
              {!isPending && users.length === 0 && (
                <p className="match">No matches</p>
              )}
              {!isPending &&
                !error &&
                users.map((user, i) => {
                  return (
                    <UserLink
                      onclick ={() => {
                        setIsFocus(false);
                        setSearch("");
                      }}
                      key={i}
                      user={user}
                    />
                  );
                })}
            </div>
          )}
        </li>
        <li className="user-new-post">
          <FontAwesomeIcon
            className="icon post"
            icon={faPlus}
            style={{ color: "#ffffff" }}
          />
          <FontAwesomeIcon
            className="icon user"
            icon={faUserCircle}
            style={{ color: "#ffffff" }}
          />
        </li>
      </ul>
    </nav>
  );
}
