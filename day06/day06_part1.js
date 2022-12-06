const fs = require('fs');
const path = require("path");


const MARKER_LENGTH = 4;

fs.readFile(path.resolve(__dirname, './input'), 'utf8', (err, data) => {
  if (err) return console.error(err);

  const stream = data.trim();

  let result;

  for (let i = 0; i < stream.length - MARKER_LENGTH + 1; i++) {
    const sequence = stream.slice(i, i + MARKER_LENGTH);

    if (sequence.length === new Set(sequence).size) {
      result = i + MARKER_LENGTH;
      break;
    }
  }

  console.log(`There are ${result} characters need to be processed before the first start-of-packet marker is detected`)

  return;
});
