const fs = require('fs');
const path = require("path");


const MIN_HEIGHT = 0;
const MAX_HEIGHT = 9;

fs.readFile(path.resolve(__dirname, './input'), 'utf8', (err, data) => {
  if (err) return console.error(err);

  const grid = data.trim().split('\n').map(line => line.split('').map(value => ({ height: Number(value) })));

  // From the left
  for (const line of grid) {
    let currentMaxHeight = MIN_HEIGHT - 1;

    for (const tree of line) {
      if (tree.height > currentMaxHeight) {
        tree.left = true;
        currentMaxHeight = tree.height;
        
        if (currentMaxHeight === MAX_HEIGHT) {
          break;
        }
      }
    }
  }

  // From the top
  for (let i = 0; i < grid[0].length; i++) {
    let currentMaxHeight = MIN_HEIGHT - 1;

    for (let j = 0; j < grid.length; j++) {
      const tree = grid[j][i];

      if (tree.height > currentMaxHeight) {
        tree.top = true;
        currentMaxHeight = tree.height;

        if (currentMaxHeight === MAX_HEIGHT) {
          break;
        }
      }
    }
  }

  // From the right
  for (const line of grid) {
    let currentMaxHeight = MIN_HEIGHT - 1;

    for (let i = line.length - 1; i > -1; i--) {
      const tree = line[i];

      if (tree.height > currentMaxHeight) {
        tree.right = true;
        currentMaxHeight = tree.height;

        if (currentMaxHeight === MAX_HEIGHT) {
          break;
        }
      }
    }
  }

  // From the bottom
  for (let i = 0; i < grid[0].length; i++) {
    let currentMaxHeight = MIN_HEIGHT - 1;

    for (let j = grid.length - 1; j > -1; j--) {
      const tree = grid[j][i];

      if (tree.height > currentMaxHeight) {
        tree.bottom = true;
        currentMaxHeight = tree.height;

        if (currentMaxHeight === MAX_HEIGHT) {
          break;
        }
      }
    }
  }

  let visibleOutsideCount = 0;

  for (const line of grid) {
    for (const { left, top, right, bottom } of line) {
      if (left || top || right || bottom) {
        visibleOutsideCount += 1;
      }
    }
  }

  console.log(`${visibleOutsideCount} trees are visible from outside the grid`);

  return;
});
