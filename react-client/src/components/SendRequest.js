import React, { useState } from "react";
import axios from "axios";

export default function SendRequest({ sender_id, receiver_id, username }) {
  const [request, setRequest] = useState(null);

  function sendRequestCall(e) {
    e.preventDefault();
    axios
      .post("http://localhost:8888/api/contacts/send-request", {
        sender_id,
        receiver_id
      })
      .then(res => {
        console.log("RES DATA", res.data);
      })
      .catch(err => {
        console.log("ERR", err);
      });
  }

  return (
    <>
      {username && (
        <div>
          <h2>Send Request</h2>
          <p>Send Friend Request to {username}</p>
          <form onSubmit={sendRequestCall}>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </>
  );
}
