const fs = require('fs');

const inputFile = 'input.txt';

const input = fs.readFileSync(inputFile, 'utf8').split('\n');

let sum = 0;

const instances = Object.fromEntries(input.map((_, index) => ([index, 1])));
console.log(instances);
for(let i = 0; i < input.length; i++) {
  const [winningNumbers, allNumbers] = input[i].split(':')[1].split('|').map(x => x.trim().split(' ').filter(v => !!v).map(y => +y));
  
  let numbers = [];
  allNumbers.forEach(num => {
    if (winningNumbers.includes(num)) numbers.push(num);
  })
  const newNumber = numbers.length;
  if (newNumber) {
    for (let j = i + 1 ; j <= i + newNumber; j++) { 
      instances[j] += instances[i]; 
    }
  };
  sum += instances[i];
}
console.log(sum);
