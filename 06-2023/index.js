const fs = require('fs');

const inputFile = 'input.txt';

const input = fs.readFileSync(inputFile, 'utf8').split('\n').filter(v => !!v);

// let product = 1;
// const times = input[0].split(':')[1].trim().split(' ').filter(v => !!v).map(v => +v);
// const distances = input[1].split(':')[1].trim().split(' ').filter(v => !!v).map(v => +v);

// for (let i = 0 ; i < times.length; i++) {
//   let waysToWin = 0;
//   for (let j = 1, k = times[i] - 1; k >= 0; j++, k--) {
//     if (j * k > distances[i]) waysToWin++;
//   }         
//   product *= waysToWin;
// }


let product = 1;
const times = [+input[0].split(':')[1].replaceAll(' ', '')];
const distances = [+input[1].split(':')[1].replaceAll(' ', '')];

for (let i = 0 ; i < times.length; i++) {
  let waysToWin = 0;
  for (let j = 0, k = times[i]; k >= 0; j++, k--) {
    if (j * k > distances[i]) {
      waysToWin = times[i] - ((j) * 2) + 1;
      break;
    }
  }         
  product *= waysToWin;
}


console.log(product);

