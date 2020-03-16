import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import axios from "axios";

import Homepage from "./components/Homepage";
import Login from "./components/Login";
import SearchUsers from "./components/SearchUsers";
import FriendRequests from "./components/FriendRequests";

function App() {
  const [contacts, setContacts] = useState();
  const id = localStorage.getItem("photostore_id");

  useEffect(() => {
    if (id) {
      getContacts();
    }
  }, [id]);

  const getContacts = () => {
    axios
      .get(`http://localhost:8888/api/contacts/${id}`)
      .then(res => {
        console.log(res.data);
        setContacts([...res.data.sender, ...res.data.receiver]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <Route exact path="/" component={Homepage} />
      <Route path="/login" component={Login} />
      <Route
        path="/search-users"
        render={props => <SearchUsers {...props} contacts={contacts} />}
      />
      <Route path="/friend-requests" component={FriendRequests} />
    </div>
  );
}

export default App;
