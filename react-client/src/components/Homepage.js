import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import axios from "axios";

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
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      {!id ? (
        loginRoute()
      ) : (
        <>
          <Dashboard />
          <button onClick={logout}>LOG OUT</button>
        </>
      )}
    </div>
  );
}
