const fs = require('fs');
const path = require("path");

const sumNumbers = (acc, cur) => acc + Number(cur);

fs.readFile(path.resolve(__dirname, './input'), 'utf8', (err, data) => {
  if (err) return console.error(err);

  const elves = data.trim().split('\n\n').map(elf => elf.split('\n').reduce(sumNumbers, 0));

  const maxCalories = elves.sort((a, b) => a - b).slice(-3).reduce(sumNumbers, 0);

  console.log(`The Elf carrying the most Calories has ${maxCalories} in total`);

  return;
});
