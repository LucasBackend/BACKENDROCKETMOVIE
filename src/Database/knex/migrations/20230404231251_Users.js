exports.up = knex => knex.schema.createTable("Users",table=>{

  table.increments("id");
  table.text("name").notNullable();
  table.text("email").notNullable();
  table.text("password").notNullable();
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("update_at").default(knex.fn.now());
 
});


exports.down = knex => knex.schema.dropTable("Users");

