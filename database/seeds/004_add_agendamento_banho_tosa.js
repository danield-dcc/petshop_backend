
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('agendamento_banho_tosa').del()
    .then(function () {
      // Inserts seed entries
      return knex('agendamento_banho_tosa').insert([
        {dia: 15, hora: 10, preco: 40, cliente_id: 1, caes_cadastrados_id: 2},
        {dia: 16, hora: 11, preco: 50, cliente_id: 2, caes_cadastrados_id: 1},

      ]);
    });
};
