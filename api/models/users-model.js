const db = require("../../database/dbConfig");

module.exports = {
  find,
  findByUsername,
  add,
  update,
  remove
};

function find(id) {
  if (id) {
    return db("users")
      .where({ id })
      .first();
  } else {
    return db("users");
  }
}

function findByUsername(username) {
  return db("users")
    .where({ username })
    .first();
}

async function add(user) {
  const [newUser] = await db("users")
    .insert(user)
    .returning("*");

  return newUser;
}

async function update(changes, id) {
  const [updatedUser] = await db("users")
    .where({ id })
    .update(changes)
    .returning("*");

  return updatedUser;
}

function remove(id) {
  return db("users")
    .where(id)
    .del();
}
