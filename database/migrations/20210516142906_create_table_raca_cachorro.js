
exports.up = (knex) => {
  return knex.schema.createTable('raca_cachorro',  (table) => {
    table.increments();
    table.string('nome', 60).notNullable();
  })
};

exports.down = (knex) => knex.schema.dropTable('raca_cachorro');