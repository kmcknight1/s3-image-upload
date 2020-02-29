import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function submitLogin(e) {
    e.preventDefault();
    axios
      .post("http://localhost:8888/api/auth/login", { username, password })
      .then(res => {
        localStorage.setItem("photostore_id", res.data.id);
        console.log("res", res);
      })
      .catch(err => console.log("err", err));
  }

  return (
    <>
      <form onSubmit={submitLogin}>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="text"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
