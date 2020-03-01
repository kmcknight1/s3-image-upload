const db = require("../../database/dbConfig");

module.exports = {
  findByUserId,
  sendRequest,
  acceptRequest,
  denyRequest
};

async function findByUserId(id) {
  const sender = await db("contacts")
    .where({ sender_id: id })
    .returning("*");

  const receiver = await db("contacts")
    .where({ receiver_id: id })
    .returning("*");

  return { sender, receiver };
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
    .update({ pending: true })
    .returning("*");

  return request;
}

//delete the row in contacts table
function denyRequest(sender_id, receiver_id) {
  return db("contacts")
    .where({ sender_id: id })
    .where({ receiver_id: id })
    .del();
}
