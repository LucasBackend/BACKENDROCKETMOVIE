exports.up = knex => knex.schema.createTable("MOVIE_NOTES",table=>{

  table.increments("id");
  table.text("title").notNullable();
  table.text("description").notNullable();
  table.integer("rating").notNullable();
  table.integer("user_id").references("id").inTable("Users").onDelete("CASCADE");
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("update_at").default(knex.fn.now());
 
});


exports.down = knex => knex.schema.dropTable("MOVIE_NOTES");

