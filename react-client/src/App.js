import React from "react";
import { Route } from "react-router-dom";
import "./App.css";

import Homepage from "./components/Homepage";
import Login from "./components/Login";
import SearchUsers from "./components/SearchUsers";
import FriendRequests from "./components/FriendRequests";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Homepage} />
      <Route path="/login" component={Login} />
      <Route path="/search-users" component={SearchUsers} />
      <Route path="/friend-requests" component={FriendRequests} />
    </div>
  );
}

export default App;
