import React, { useState, useEffect } from "react";
import axios from "axios";

export default function FriendRequests() {
  const [requests, setRequests] = useState([]);
  const [selectValue, setSelectValue] = useState();
  // const [senderId, setSenderId] = useState();
  const userId = localStorage.getItem("photostore_id");

  useEffect(() => {
    getRequests();
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
    <>
      <div>FRIEND REQUESTS</div>
      <form id="userRequestForm">
        <select
          onChange={selectUserRequest}
          id="user"
          name="userRequests"
          form="userRequestsForm"
          value={selectValue}
        >
          {requests.length ? (
            requests.map(request => {
              return (
                <option value={request.username} key={request.id}>
                  {request.username}
                </option>
              );
            })
          ) : (
            <option>No Requests</option>
          )}
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
    </>
  );
}
