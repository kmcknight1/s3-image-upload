import React, { useState, useEffect } from "react";
import axios from "axios";
import SendRequest from "./SendRequest";

export default function SearchUsers() {
  const [users, setUsers] = useState();
  const [sender_id, setSender_id] = useState();
  const [username, setUsername] = useState();
  const userId = localStorage.getItem("photostore_id");

  useEffect(() => {
    getAllUsers();
  }, []);

  function getAllUsers() {
    axios
      .get("http://localhost:8888/api/users/")
      .then(res => {
        console.log("USERS: ", res.data);
        setUsers(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <>
      <h1>SEARCH USERS</h1>
      {users &&
        users.map(user => {
          return (
            <button
              onClick={() => {
                setSender_id(user.id);
                setUsername(user.username);
              }}
              key={user.id}
            >
              {user.username}
            </button>
          );
        })}
      <SendRequest sender_id={sender_id} username={username} />
    </>
  );
}
