const fs = require('fs');
const path = require("path");


const GROUP_SIZE = 3;

fs.readFile(path.resolve(__dirname, './input'), 'utf8', (err, data) => {
  if (err) return console.error(err);

  const rucksacks = data.trim().split('\n');
  const stickers = [];

  for (let i = 0; i < rucksacks.length; i += GROUP_SIZE) {
    const groupCount = new Map();

    for (let j = 0; j < GROUP_SIZE; j++) {
      const rucksack = new Set(rucksacks[i + j]);

      for (const item of rucksack) {
        groupCount.set(item, (groupCount.get(item) || 0) + 1);
      }
    }

    for (const [item, count] of groupCount) {
      if (count !== GROUP_SIZE) continue;

      const code = item.charCodeAt();

      // Lowercase item types a through z have priorities 1 through 26.
      // Uppercase item types A through Z have priorities 27 through 52.
      stickers.push(code > 90 ? code - 96 : code - 38);

      break;
    }
  }

  const sum = stickers.reduce((a, b) => a + b);

  console.log(`The sum of the priorities of item types is ${sum}`);

  return;
});
