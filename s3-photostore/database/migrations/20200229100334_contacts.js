exports.up = function(knex) {
  return knex.schema.createTable("contacts", tbl => {
    tbl.increments();
    tbl
      .integer("sender_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("cascade")
      .onDelete("cascade");
    tbl
      .integer("receiver_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("cascade")
      .onDelete("cascade");
    tbl.boolean("pending").defaultTo(true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("contacts");
};
