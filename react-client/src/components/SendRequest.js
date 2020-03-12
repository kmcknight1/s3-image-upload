import React, { useState } from "react";
import axios from "axios";

export default function SendRequest({ sender_id, username }) {
  const [request, setRequest] = useState(null);

  return (
    <>
      <h3>Send Request</h3>
      <form>
        <input type="text" value={username} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
