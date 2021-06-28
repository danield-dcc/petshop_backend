
exports.up = (knex) => {
    return knex.schema.createTable('clientes',  (table) => {
      table.increments();
      table.string('nome', 60).notNullable();
      table.string('endereco', 60).notNullable();
      table.integer('CPF', 9).notNullable();
      table.integer('telefone', 15).notNullable();
      table.boolean('destaque').notNullable().defaultTo(false);
      
      //cria campo de relacionamento com a caes_cadastrados
      table.integer('caes_cadastrados_id').notNullable().unsigned();
      table.foreign('caes_cadastrados_id')
            .references('caes_cadastrados.id')
            .onDelete('restrict')
            .onUpdate('cascade')
            
      //cria os campos created_at e updated_at
      table.timestamps(true, true)
    })
  };
  
  exports.down = (knex) => knex.schema.dropTable('clientes');