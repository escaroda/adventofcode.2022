const fs = require('fs');
const path = require("path");


const SIZE_MARGIN = 100000;

fs.readFile(path.resolve(__dirname, './input'), 'utf8', (err, data) => {
  if (err) return console.error(err);

  const lines = data.trim().split('\n').map(line => line.split(' '));

  const tree = { _size: 0 };
  const rootPointer = tree;

  let currentPointer = tree;

  const changeDirectory = (name) => {
    if (name === '/') {
      currentPointer = rootPointer;
    } else {
      currentPointer = currentPointer[name];
    }
  }

  const propagateSize = (pointer, size) => {
    if (!pointer) return;

    pointer._size += size;
    propagateSize(pointer['..'], size);
  }

  const createDirOfFile = ([ sizeOrDir, name ]) => {
    if (sizeOrDir === 'dir') {
      currentPointer[name] = { '..': currentPointer, _size: 0 };
    } else {
      const size = Number(sizeOrDir);
      propagateSize(currentPointer, size);
    }
  }

  // construct tree
  for (const line of lines) {
    if (line[0] === '$') {
      const [, command, name] = line;

      if (command !== 'cd') continue;

      changeDirectory(name);
    } else {
      createDirOfFile(line)
    }
  }

  let sumOfSizes = 0;

  // traverse tree
  const stack = [tree];
  while (stack.length) {
    const folder = stack.pop();

    if (folder._size <= SIZE_MARGIN) {
      sumOfSizes += folder._size;
    }

    for (const key in folder) {
      if (key === '_size' || key === '..') continue;
      stack.push(folder[key]);
    }
  }

  console.log(`The sum of the total sizes is ${sumOfSizes}`)

  return;
});
