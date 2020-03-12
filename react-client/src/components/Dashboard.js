import React from "react";
import { Link } from "react-router-dom";

import FriendRequests from "./FriendRequests";
import SearchUsers from "./SearchUsers";

export default function Dashboard() {
  return (
    <>
      <div>Dashboard</div>
      <nav>
        <Link to="/search-users">Find Friends</Link>
        <Link to="/friend-requests">Friend Requests</Link>
      </nav>
    </>
  );
}
