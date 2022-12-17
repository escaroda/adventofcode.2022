const fs = require('fs');
const path = require("path");


fs.readFile(path.resolve(__dirname, './input'), 'utf8', (err, data) => {
  if (err) return console.error(err);

  const grid = data.trim().split('\n').map(line => line.split('').map(Number));

  let maxScenic = 1;

  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[0].length - 1; j++) {
      const treeHeight = grid[i][j];

      // Look Left
      let distanceLeft = 1;
      while (j - distanceLeft > 0 && grid[i][j - distanceLeft] < treeHeight) {
        distanceLeft++;
      }

      // Look Up
      let distanceUp = 1;
      while (i - distanceUp > 0 && grid[i - distanceUp][j] < treeHeight) {
        distanceUp++;
      }

      // Look Right
      let distanceRight = 1;
      while (j + distanceRight < grid[0].length - 1 && grid[i][j + distanceRight] < treeHeight) {
        distanceRight++;
      }

      // Look Down
      let distanceDown = 1;
      while (i + distanceDown < grid.length - 1 && grid[i + distanceDown][j] < treeHeight) {
        distanceDown++;
      }

      maxScenic = Math.max(distanceLeft * distanceUp * distanceRight * distanceDown, maxScenic);
    }
  }

  console.log(`The highest scenic score possible is ${maxScenic}`);

  return;
});
