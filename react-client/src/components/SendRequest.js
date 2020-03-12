import React, { useState } from "react";
import axios from "axios";

export default function SendRequest() {
  const [request, setRequest] = useState(null);
  const connection = new WebSocket("ws://localhost:1234");

  connection.addEventListener("open", () => {
    console.log("websocket connected");
  });

  connection.addEventListener("message", e => {
    console.log("WS REQUEST", e.data);
  });

  function send(data) {
    if (connection.readyState === WebSocket.OPEN) {
      connection.send(data);
    } else {
      throw "Not Connected";
    }
  }

  function sendRequest() {}
  return (
    <>
      <h3>Send Request</h3>
      <form onSubmit={sendRequest}>
        <input type="text" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
