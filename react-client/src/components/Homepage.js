import React from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";

export default function Homepage() {
  const id = localStorage.getItem("photostore_id");

  return <>{!id ? <Login /> : <Dashboard />}</>;
}
