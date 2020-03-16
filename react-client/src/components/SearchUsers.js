import React, { useState, useEffect } from "react";
import axios from "axios";
import SendRequest from "./SendRequest";

export default function SearchUsers(props) {
  const [allUsers, setAllUsers] = useState();
  const [filteredUsers, setFilteredUsers] = useState();
  const [receiver_id, setReceiver_id] = useState();
  const [username, setUsername] = useState();
  const [searchText, setSearchText] = useState();
  const [showAll, setShowAll] = useState(false);
  const [contactIds, setContactIds] = useState([]);
  const userId = localStorage.getItem("photostore_id");

  //getting all users
  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (props.contacts) {
      let senderIds = props.contacts.map(contact => contact.sender_id);
      let receiverIds = props.contacts.map(contact => contact.receiver_id);
      setContactIds([...contactIds, ...senderIds, ...receiverIds]);
    }
  }, [props.contacts]);

  //setting filtered users for the search
  useEffect(() => {
    if (allUsers) {
      const results = allUsers.filter(user => {
        return user.username.includes(searchText);
      });
      setFilteredUsers(results);
    }
  }, [searchText]);

  function getAllUsers() {
    axios
      .get("http://localhost:8888/api/users/")
      .then(res => {
        setAllUsers(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleSearchInputChange(e) {
    setSearchText(e.target.value);
    console.log(searchText);
  }

  //clicking on a user to pop up
  function clickUser(user) {
    setReceiver_id(user.id);
    setUsername(user.username);
  }

  return (
    <div
      style={{
        border: "1px solid darkslategrey",
        width: "75%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <h1>SEARCH USERS</h1>
      <form>
        <input
          type="text"
          value={searchText}
          name="searchText"
          onChange={handleSearchInputChange}
        />
      </form>
      <button
        onClick={() => {
          showAll ? setShowAll(false) : setShowAll(true);
        }}
      >
        {showAll ? "Hide All" : "Show All"}
      </button>
      {showAll &&
        !filteredUsers &&
        allUsers.map(user => {
          if (contactIds.includes(user.id)) {
            return (
              <p key={user.id} style={{ color: "grey" }}>
                {user.username}
              </p>
            );
          } else {
            return (
              <p
                key={user.id}
                onClick={() => clickUser(user)}
                style={{ cursor: "pointer" }}
              >
                {user.username}
              </p>
            );
          }
        })}
      {filteredUsers &&
        filteredUsers.map(user => {
          return (
            <div
              key={user.id}
              style={{ display: "flex", alignItems: "center" }}
            >
              <p onClick={() => clickUser(user)} style={{ cursor: "pointer" }}>
                {user.username}
              </p>
            </div>
          );
        })}
      <SendRequest
        sender_id={userId}
        receiver_id={receiver_id}
        username={username}
      />
    </div>
  );
}
