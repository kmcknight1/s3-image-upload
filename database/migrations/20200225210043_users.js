exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments();
    tbl
      .string("username", 50)
      .notNullable()
      .unique();
    tbl.string("password").notNullable();
    tbl.string("name", 50);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
