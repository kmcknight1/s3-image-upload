const db = require("../../database/dbConfig");

module.exports = {
  find,
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

function add(user) {
    const [newUser] = await db("users").insert(user).returning("*");

    return newUser;
}

function update(changes, id) {
    const [updatedUser] = await db("users").where({id}).update(changes).returning("*");

    return updatedUser;
}

function remove(id) {
    return db("users").where(id).del();
}