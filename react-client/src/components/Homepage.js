import React from "react";
import { useHistory } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";

export default function Homepage() {
  const id = localStorage.getItem("photostore_id");
  let history = useHistory();

  const loginRoute = () => {
    history.push("/login");
  };

  const logout = () => {
    localStorage.removeItem("photostore_id");
    history.push("/");
  };

  return (
    <>
      {!id ? (
        loginRoute()
      ) : (
        <>
          <Dashboard />
          <button onClick={logout}>LOG OUT</button>
        </>
      )}
    </>
  );
}
