import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SendRequest({ sender_id, receiver_id, username }) {
  const [existingRequest, setExistingRequest] = useState();

  useEffect(() => {
    if (receiver_id) {
      checkForExistingRequest();
    }
  }, [receiver_id]);

  function checkForExistingRequest() {
    axios
      .get(`http://localhost:8888/api/contacts/requests/${receiver_id}`)
      .then(res => {
        console.log(res.data);
        res.data.forEach(result => {
          if (result.sender_id == sender_id) {
            setExistingRequest(true);
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

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
            <button disabled={existingRequest && true} type="submit">
              Submit
            </button>
          </form>
          {existingRequest && (
            <p>{username} has not responded to your request yet.</p>
          )}
        </div>
      )}
    </>
  );
}
