
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('caes_cadastrados').del()
    .then(function () {
      // Inserts seed entries
      return knex('caes_cadastrados').insert([
        {nome: 'Churumela', idade: 2, raca_cachorro_id: 1, foto: "https://upload.wikimedia.org/wikipedia/commons/7/70/Serena_REFON.jpg"},
        {nome: 'Pantufa', idade: 7, raca_cachorro_id: 9, foto: "https://www.petlove.com.br/images/breeds/193446/profile/original/pinscher-p.jpg?1532539343"},
        {nome: 'Leona', idade: 3, raca_cachorro_id: 2, foto: "https://www.petlove.com.br/images/breeds/193103/profile/original/pastor_alemao-p.jpg?1532539270"},
        {nome: 'Alemão', idade: 2, raca_cachorro_id: 4, foto: "https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.sunsetresort.com.br%2Fdicas-de-racas-labrador%2F&psig=AOvVaw33cxuiIvbl3b8OSnZAz2uV&ust=1622078202173000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJCE4aqW5vACFQAAAAAdAAAAABAD"},
      ]);
    });
};
