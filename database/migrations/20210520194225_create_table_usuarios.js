
exports.up = (knex) => {
    return knex.schema.createTable('usuarios',  (table) => {
      table.increments();
      table.string('nome', 60).notNullable();
      table.string('email', 60).notNullable();
      table.string('senha', 60).notNullable();
      table.timestamps(true, true)
    })
  };
  
  exports.down = (knex) => knex.schema.dropTable('usuarios');