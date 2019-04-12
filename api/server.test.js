const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig.js');

describe('Server', () => {

  describe('GET /games endpoint', () => {
    
    afterEach(async () => {
      await db('games').truncate();
    });

    it('responds with the correct status code', async () => {
      const res = await request(server).get('/games')
      expect(res.status).toBe(200)
    });

    it('returns the right response body', async () => {
      const game1 = { title: 'Final Fantasy VII', genre: 'RPG', releaseYear:'1997' };
      const game2 = { title: 'Super Smash Bros. Melee', genre: 'Fighting Game', releaseYear:'2001' };
      await request(server).post('/games').send(game1)
      await request(server).post('/games').send(game2)

      const res = await request(server).get('/games');
      expect(res.body).toHaveLength(2);

      expect(res.body).toEqual([
        { id: 1, title: 'Final Fantasy VII', genre: 'RPG', releaseYear:'1997' },
        { id: 2, title: 'Super Smash Bros. Melee', genre: 'Fighting Game', releaseYear:'2001' }
      ])
    })

    it('returns an empty array if no games in db', async () => {
      const res = await request(server).get('/games');
      expect(res.body).toEqual([])
    })

  })

  describe('POST /games endpoint', () => {

    afterEach(async () => {
      await db('games').truncate();
    });

    it("returns correct status code on success", () => {
      const game = { title: 'Final Fantasy VII', genre: 'RPG', releaseYear:'1997' };
      return request(server)
        .post(`/games`)
        .send(game)
        .expect(201)
    });

    it("returns correct status code on failure", () => {
      const game = { genre: 'RPG', releaseYear:'1997' };
      return request(server)
        .post(`/games`)
        .send(game)
        .expect(422);
    });

    it("returns the right response body", () => {
      const game = { title: 'Final Fantasy VII', genre: 'RPG', releaseYear:'1997' };
      const expectedResponseBody = { id: 1, title: 'Final Fantasy VII', genre: 'RPG', releaseYear:'1997' };
      return request(server)
        .post(`/games`)
        .send(game)
        .expect(expectedResponseBody)
        .expect('Content-Type', /json/)
    });

  })
})