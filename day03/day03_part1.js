const fs = require('fs');
const path = require("path");


fs.readFile(path.resolve(__dirname, './input'), 'utf8', (err, data) => {
  if (err) return console.error(err);

  const rucksacks = data.trim().split('\n').map(rucksack => [
    new Set(rucksack.slice(0, rucksack.length / 2)),
    new Set(rucksack.slice(rucksack.length / 2)),
  ]);

  const shares = [];

  for (const [firstCompartment, secondCompartment] of rucksacks) {
    for (const item of firstCompartment) {
      if (!secondCompartment.has(item)) continue;

      const code = item.charCodeAt();

      // Lowercase item types a through z have priorities 1 through 26.
      // Uppercase item types A through Z have priorities 27 through 52.
      shares.push(code > 90 ? code - 96 : code - 38);
    }
  }

  const sum = shares.reduce((a, b) => a + b);

  console.log(`The sum of the priorities of item types is ${sum}`);

  return;
});
