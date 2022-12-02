const fs = require('fs');
const path = require("path");

function getRoundScore([opponent, me]) {
  if (opponent === me) { // draw
    return me + 3;
  }

  if (opponent === 1 && me === 2 || opponent === 2 && me === 3 || opponent === 3 && me === 1) { // win
    return me + 6;
  }

  return me; // loss
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
