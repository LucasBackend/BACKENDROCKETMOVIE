exports.up = knex => knex.schema.createTable("MOVIE_TAGS",table=>{

  table.increments("id");
  table.text("name").notNullable();
  table.integer("user_id").references("id").inTable("Users").onDelete("CASCADE");
  table.integer("note_id").references("id").inTable("MOVIE_NOTES").onDelete("CASCADE");
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("update_at").default(knex.fn.now());
 
});


exports.down = knex => knex.schema.dropTable("MOVIE_TAGS");

