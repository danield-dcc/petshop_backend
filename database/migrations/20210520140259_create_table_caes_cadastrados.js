
exports.up = (knex) => {
    return knex.schema.createTable('caes_cadastrados',  (table) => {
      table.increments();
      table.string('nome', 60).notNullable();
      table.integer('idade', 2).notNullable();
      table.string('foto').notNullable();
      table.boolean('destaque').notNullable().defaultTo(false);
      
      //cria campo de relacionamento com a tabela raca
      table.integer('raca_cachorro_id').notNullable().unsigned();
      table.foreign('raca_cachorro_id')
            .references('raca_cachorro.id')
            .onDelete('restrict')
            .onUpdate('cascade')
            
      //cria os campos created_at e updated_at
      table.timestamps(true, true)
    })
  };
  
  exports.down = (knex) => knex.schema.dropTable('caes_cadastrados');