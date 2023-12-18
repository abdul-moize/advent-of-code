const fs = require('fs');

const inputFile = 'input.txt';

const input = fs.readFileSync(inputFile, 'utf8').split('\n');

let sum1 = 0;
let sum2 = 0;

for (let i = 0; i < input.length; i++) {
  const numbers = input[i].split(' ').map(Number);
  const pyramid = [[...numbers]];
  for (let j = 0; j < pyramid.length; j++) {
    const row = pyramid[j];
    const nextRow = [];
    let zeroCount = 0;
    for (let k = 1; k < row.length; k++) {
      const difference =  row[k] - row[k - 1];
      if(difference === 0) zeroCount++;

      nextRow.push(difference);
    }
    if (nextRow.length <= 0) break;
    pyramid.push(nextRow);
    if (zeroCount === row.length - 1) break;
  }
  for (let j = pyramid.length - 1; j > 0; j--) {
    const newValue2 = pyramid[j-1][0] - pyramid[j][0];
    const newValue1 = pyramid[j-1][pyramid[j-1].length - 1] + pyramid[j][pyramid[j].length - 1];
    pyramid[j-1] = [newValue2, ...pyramid[j-1], newValue1];
  }
  sum2 += pyramid[0][0];
  sum1 += pyramid[0][pyramid[0].length - 1];
}

console.log('Part1: ', sum1);
console.log('Part2: ', sum2);
