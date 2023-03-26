import React from "react";
import Users from "../api/Users";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
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
      console.log(error);
      setError(error);
    } finally {
      setIsPending(false);
    }
  };
  useEffect(() => {
    // getUser(`/${username}`);
  }, [username]);

  return (
    <div className="home user">
      {isPending && <Loading/>}

      
    </div>
  );
}
