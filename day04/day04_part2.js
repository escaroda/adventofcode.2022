const fs = require('fs');
const path = require("path");


fs.readFile(path.resolve(__dirname, './input'), 'utf8', (err, data) => {
  if (err) return console.error(err);

  const pairs = data.trim().split('\n').map(pair => pair.split(',').map(range => range.split('-').map(Number)));

  let overlapCount = 0;

  for (const [[firstLeft, firstRight], [secondLeft, secondRight]] of pairs) {
    if (firstRight < secondLeft || firstLeft > secondRight) continue;
    overlapCount += 1;
  }

  console.log(`There are ${overlapCount} assignment pairs where the ranges overlap`);

  return;
});
