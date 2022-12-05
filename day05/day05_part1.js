const fs = require('fs');
const path = require("path");


const NUM_OF_STACKS = 9;
const CHARS_BETWEEN_STACKS = 4;

const nonDigit = /\D+/;
const crates = /[A-Z]/;

fs.readFile(path.resolve(__dirname, './input'), 'utf8', (err, data) => {
  if (err) return console.error(err);

  const [stacksRaw, movesRaw] = data.trim().split('\n\n');

  // parse stacks
  const stacks = stacksRaw.split('\n').slice(0, -1).reverse().reduce((acc, cur) => {
    for (let i = 0; i < NUM_OF_STACKS; i++) {
      const item = cur[1 + i * CHARS_BETWEEN_STACKS];
      if (item.match(crates)) {
        acc[i].push(item)
      }
    }
    return acc;
  }, Array.from({ length: NUM_OF_STACKS }, () => []));

  // parse rearrangement procedure
  const moves = movesRaw.split('\n').map(line => {
    const [,amount, from, to] = line.split(nonDigit).map(Number);
    return { amount, from: from - 1, to: to - 1 };
  });

  // implement procedure
  for (const { amount, from, to } of moves) {
    for (let i = 0; i < amount; i++) {
      const crate = stacks[from].pop();
      stacks[to].push(crate);
    }
  }

  const onTop = stacks.map(stack => stack[stack.length - 1]).join('');

  console.log(`${onTop} ends up on top of each stack after the rearrangement procedure completes`);

  return;
});
