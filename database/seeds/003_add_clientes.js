
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('clientes').del()
    .then(function () {
      // Inserts seed entries
      return knex('clientes').insert([
        { nome: "Carlos Manoel", caes_cadastrados_id: 2, endereco: "Duque de Caxias, 1808", cpf: 123456789, telefone: 988556633 },
        { nome: "Maria da Silva", caes_cadastrados_id: 1, endereco: "Osório, 2505", cpf: 321654987, telefone: 81828282 },
        { nome: "Ana Carvalho", caes_cadastrados_id: 3, endereco: "Bento Gonçaves, 755", cpf: 123456789, telefone: 988556644 },

      ]);
    });
};
