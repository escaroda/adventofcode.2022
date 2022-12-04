const fs = require('fs');
const path = require("path");


fs.readFile(path.resolve(__dirname, './input'), 'utf8', (err, data) => {
  if (err) return console.error(err);

  const pairs = data.trim().split('\n').map(pair => pair.split(',').map(range => range.split('-').map(Number)));

  let fullOverlapCount = 0;

  for (const [[firstLeft, firstRight], [secondLeft, secondRight]] of pairs) {
    if (
      firstLeft >= secondLeft && firstRight <= secondRight ||
      secondLeft >= firstLeft && secondRight <= firstRight
    ) {
      fullOverlapCount += 1;
    }
  }

  console.log(`There are ${fullOverlapCount} assignment pairs where one range fully contain the other`);

  return;
});
