import React, { useState, useEffect } from "react";
import axios from "axios";

export default function FriendRequests({ contacts }) {
  const [requests, setRequests] = useState([]);
  const [selectValue, setSelectValue] = useState();
  const userId = localStorage.getItem("photostore_id");

  useEffect(() => {
    getRequests();
    console.log(contacts);
  }, []);

  function getRequests() {
    axios
      .get(`http://localhost:8888/api/contacts/requests/${userId}`)
      .then(res => {
        console.log(res.data);
        setRequests(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  async function selectUserRequest(e) {
    try {
      setSelectValue(e.target.value);
    } catch (err) {
      alert(err);
    }
  }

  function acceptRequest(body) {
    axios
      .put(`http://localhost:8888/api/contacts/accept-request`, body)
      .then(res => {
        console.log(res.data);
        alert("Request Accepted");
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div style={{ border: "1px solid green", width: "75%" }}>
      <h1>FRIEND REQUESTS</h1>
      <form id="userRequestForm">
        <select
          onChange={selectUserRequest}
          id="user"
          name="userRequests"
          form="userRequestsForm"
          value={selectValue}
        >
          <option value="">
            {requests.length ? "Requests" : "No friend requests"}
          </option>
          {requests.length &&
            requests.map(request => {
              return (
                <option value={request.username} key={request.id}>
                  {request.username}
                </option>
              );
            })}
        </select>
      </form>
      {selectValue && (
        <>
          <p>{selectValue}</p>
          <button
            onClick={() => {
              const senderIdObj = requests.filter(req => {
                return req.username === selectValue;
              });
              const sender_id = senderIdObj[0].sender_id;
              const receiver_id = userId;

              acceptRequest({ sender_id, receiver_id });
            }}
          >
            Accept Request
          </button>
        </>
      )}
    </div>
  );
}
