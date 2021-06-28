
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('raca_cachorro').del()
    .then(function () {
      // Inserts seed entries
      return knex('raca_cachorro').insert([
        {nome: 'Vira-Lata'},
        {nome: 'Pastor-Alemão'},
        {nome: 'Buldogue'},
        {nome: 'Labrador'},
        {nome: 'Chihuahua'},
        {nome: 'Dachshund'},
        {nome: 'Husky Siberiano'},
        {nome: 'Shih-tzu'},
        {nome: 'Pinscher'},
        {nome: 'Beagle'},
        {nome: 'Pug'},
        {nome: 'Lulu da pomerânia'},
        {nome: 'Yorkshire'},
       
      ]);
    });
};
