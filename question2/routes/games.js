const express = require('express');
const {
  returnQuestions,
  addScore,
} = require('../models/games');

const router = express.Router();

// GET un jeu de 3 devinettes, potentiellement correspondant au niveau fourni
router.get('/start', (req, res) => {
  const riddles = returnQuestions(req?.query?.level);

  return res.json(riddles);
});

// POST créer un score pour un joueur
router.post('/', (req, res) => {
  const player = req?.body?.player?.length !== 0 ? req.body.player : undefined;
  const score = req?.body?.score >= 0 && req?.body?.score <= 3 ? req.body.score : undefined;

  if (!player || !score) return res.sendStatus(400); // error code '400 Bad request'

  const createdGame = addScore(player, score);

  return res.json(createdGame);
});

module.exports = router;
