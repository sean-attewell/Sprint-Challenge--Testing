
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        { title: 'Super Smash Bros. Melee', genre: 'Fighting Game', releaseYear:'2001'},
        { title: 'Shadow of the Colossus', genre: 'Adventure Game', releaseYear:'2005'},
        { title: 'Final Fantasy VII', genre: 'RPG', releaseYear:'1997'}
      ]);
    });
};
