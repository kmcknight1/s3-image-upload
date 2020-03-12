import React from "react";

import FriendRequests from "./FriendRequests";
import SearchUsers from "./SearchUsers";

export default function Dashboard() {
  return (
    <>
      <div>Dashboard</div>
      <SearchUsers />
      <FriendRequests />
    </>
  );
}
