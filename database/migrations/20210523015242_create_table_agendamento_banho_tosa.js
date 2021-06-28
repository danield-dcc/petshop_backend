
exports.up = (knex) => {
    return knex.schema.createTable('agendamento_banho_tosa', (table) => {
        table.increments();
        table.integer('dia', 2).notNullable();
        table.integer('hora', 6).notNullable();
        table.decimal('preco', 9.2).notNullable();

        //cria campo de relacionamento com a tabela 
        table.integer('cliente_id').notNullable().unsigned();
        table.foreign('cliente_id')
            .references('clientes.id')
            .onDelete('restrict')
            .onUpdate('cascade')
        table.integer('caes_cadastrados_id').notNullable().unsigned();
        table.foreign('caes_cadastrados_id')
            .references('caes_cadastrados.id')
            .onDelete('restrict')
            .onUpdate('cascade')


        //cria os campos created_at e updated_at
        table.timestamps(true, true)
    })
};

exports.down = (knex) => knex.schema.dropTable('agendamento_banho_tosa');