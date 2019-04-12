const express = require('express');

const Games = require('../games/gamesModel.js');

const server = express();
server.use(express.json());

server.get('/games', async (req, res) => {
  try {
    const allGames = await Games.getAll();
    res.status(200).json(allGames);
  } catch(error) {
    console.log(error);
    res.status(500).json({ error: "There was an error getting games from the database" })
  }
});

server.post('/games', async (req, res) => {
  if (!req.body.title || !req.body.genre) {
      res.status(422).json({ errorMessage: "Please provide title and genre for the game." });
  } else {
  try {
      const game = await Games.insert(req.body);
      res.status(201).json(game);
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "There was an error while saving the game to the database" });
  }
}});

module.exports = server;
