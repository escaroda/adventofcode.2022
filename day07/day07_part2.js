const fs = require('fs');
const path = require("path");


const DISK_SPACE_AVAILABLE = 70000000;
const DISK_SPACE_REQUIRED = 30000000;

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

  for (const line of lines) {
    if (line[0] === '$') {
      const [, command, name] = line;

      if (command !== 'cd') continue;

      changeDirectory(name);
    } else {
      createDirOfFile(line)
    }
  }

  const diskSpaceUnused = DISK_SPACE_AVAILABLE - rootPointer._size;
  const diskSpaceLack = DISK_SPACE_REQUIRED - diskSpaceUnused;

  const candidates = [];

  const stack = [tree];
  while (stack.length) {
    const folder = stack.pop();

    if (folder._size >= diskSpaceLack) {
      candidates.push(folder._size);
    }

    for (const key in folder) {
      if (key === '_size' || key === '..') continue;
      stack.push(folder[key]);
    }
  }

  candidates.sort((a, b) => a - b);

  console.log(`The total size of directory that would free up enough space on the filesystem is ${candidates[0]}`)

  return;
});
