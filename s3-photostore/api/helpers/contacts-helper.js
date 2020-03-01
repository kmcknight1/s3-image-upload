const db = require("../../database/dbConfig");

module.exports = {
  findByUserId,
  findUserRequests,
  sendRequest,
  acceptRequest,
  deleteRequest
};

async function findByUserId(id) {
  const sender = await db("contacts")
    .where({ sender_id: id })
    .where({ pending: false })
    .returning("*");

  const receiver = await db("contacts")
    .where({ receiver_id: id })
    .where({ pending: false })
    .returning("*");

  return { sender, receiver };
}

async function findUserRequests(receiver_id) {
  const requests = await db("contacts")
    .join("users", "users.id", "contacts.sender_id")
    .where("contacts.receiver_id", "=", receiver_id)
    .where("contacts.pending", "=", true)
    .select("contacts.id", "username", "sender_id", "receiver_id", "pending");

  return requests;
}

//creating a new row in the contacts table, pending === true
async function sendRequest(sender_id, receiver_id) {
  const [newRequest] = await db("contacts")
    .insert({ sender_id, receiver_id })
    .returning("*");
  return newRequest;
}

//change pending to false
async function acceptRequest(sender_id, receiver_id) {
  const [request] = await db("contacts")
    .where({ sender_id })
    .where({ receiver_id })
    .update({ pending: false })
    .returning("*");

  return request;
}

//delete the row in contacts table
function deleteRequest(sender_id, receiver_id) {
  return db("contacts")
    .where({ sender_id })
    .where({ receiver_id })
    .del();
}
