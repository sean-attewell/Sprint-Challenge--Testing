const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  getAll
};

async function insert(game) {
  const [id] = await db('games').insert(game);
  return await db('games').where({ id }).first();
}

function getAll() {
  return db('games');
}

