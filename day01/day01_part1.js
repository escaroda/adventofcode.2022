const fs = require('fs');
const path = require("path");


fs.readFile(path.resolve(__dirname, './input'), 'utf8', (err, data) => {
  if (err) return console.error(err);

  const elves = data.trim().split('\n\n').map(elf => elf.split('\n').reduce((acc, cur) => acc + Number(cur), 0));
  
  const maxCalories = Math.max(...elves);
  
  console.log(`The Elf carrying the most Calories has ${maxCalories} in total`);

  return;
});
