const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/questions.json');
const jsonDbPath2 = path.join(__dirname, '/../data/games.json');

function returnQuestions(level) {
  const questions = parse(jsonDbPath);
  let tabQuestions;
  const tabReturn = [];
  let q1;
  let q2;
  let q3;

  if (level === undefined || level < 1 || level > 3) {
    q1 = questions[generateRandomNumber(0, questions.length - 1)];
    q2 = questions[generateRandomNumber(0, questions.length - 1)];
    q3 = questions[generateRandomNumber(0, questions.length - 1)];
  } else {
    tabQuestions = returnQuestionsByLevel(level);
    q1 = tabQuestions[generateRandomNumber(0, tabQuestions.length - 1)];
    q2 = tabQuestions[generateRandomNumber(0, tabQuestions.length - 1)];
    q3 = tabQuestions[generateRandomNumber(0, tabQuestions.length - 1)];
  }
  tabReturn.push(q1);
  tabReturn.push(q2);
  tabReturn.push(q3);

  return tabReturn;
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function returnQuestionsByLevel(level) {
  const questions = parse(jsonDbPath);
  const retour = [];
  questions.forEach((element) => {
    if (level === 1 && element.level === 'easy') {
      retour.push(element);
    } else if (level === 2 && element.level === 'medium') {
      retour.push(element);
    } else if (level === 3 && element.level === 'hard') {
      retour.push(element);
    }
  });

  return retour;
}

function addScore(player, score) {
  const games = parse(jsonDbPath2);

  const createdGame = {
    player,
    score,
    date: new Date(),
  };

  games.push(createdGame);

  serialize(jsonDbPath2, games);

  return createdGame;
}

module.exports = {
  returnQuestions,
  addScore,
};
