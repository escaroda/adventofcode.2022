const fs = require('fs');
const path = require("path");

const myWinChoice = {
  1: 2,
  2: 3,
  3: 1,
};

const myLossChoice = {
  1: 3,
  2: 1,
  3: 2,
};

function getRoundScore([opponent, outcome]) {
  if (outcome === 2) { // draw
    return opponent + 3;
  }

  if (outcome === 3) { // win
    return myWinChoice[opponent] + 6;
  }

  return myLossChoice[opponent]; // loss
}

fs.readFile(path.resolve(__dirname, './input'), 'utf8', (err, data) => {
  if (err) return console.error(err);

  const rounds = data.trim().split('\n').map(round => {
    const choices = round.split(' ').map(choice => choice.charCodeAt() - 64);
    choices[choices.length - 1] -= 23 // Align ABC and XYZ charCodes
    return choices;
  });

  const totalScore = rounds.reduce((score, round) => score + getRoundScore(round), 0);

  console.log(`The total score will be ${totalScore}`);

  return;
});
