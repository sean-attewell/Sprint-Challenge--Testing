const db = require('../data/dbConfig.js');
const Games = require('./gamesModel');

describe('gamesModel', () => {

  afterEach(async () => {
    await db('games').truncate();
  })

  describe('insert', () => {
    it('inserts games into db', async () => {
      const newGame = await Games.insert({ title: 'Final Fantasy VII', genre: 'RPG', releaseYear:'1997' })
      expect(newGame.title).toBe('Final Fantasy VII')
      expect(newGame.genre).toBe('RPG')
      expect(newGame.releaseYear).toBe('1997')
      expect(newGame).toEqual({ id: 1, title: 'Final Fantasy VII', genre: 'RPG', releaseYear:'1997' });
    })
  })

  describe('getAll', ()=> {
    it('returns list of all games in db', async () => {
      await Games.insert({ title: 'Final Fantasy VII', genre: 'RPG', releaseYear:'1997' });
      await Games.insert({ title: 'Shadow of the Colossus', genre: 'Adventure Game', releaseYear:'2005' });

      const allGames = await Games.getAll();
      expect(allGames).toHaveLength(2);

    })
  })
})