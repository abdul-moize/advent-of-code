const fs = require('fs');

const inputFile = 'input.txt';

const input = fs.readFileSync(inputFile, 'utf8').split('\n');

const snafuToDecimal = (snafu) => {
  const wordToValue = { '-': -1, "=": -2 };
  let sum = 0;
  for(let i = snafu.length - 1, j = 0; i >= 0 ; i--, j++) {
    sum += (wordToValue[snafu[i]] || (+snafu[i])) * (5**(j));
  }
  return sum;
 }

let sum = 0;
input.forEach((line) => { 
  sum += snafuToDecimal(line);
});

const decimalToSnafu = (decimal) => {
  let snafu = '';
  valueToWord = { 0: '0', 1: '1', 2: '2', '3': '=', '4': '-', '5': '0' };
  let carry = 0;
  while(decimal > 0) {
    const remainder = (decimal % 5) + carry;
    carry = remainder >= 3 ? 1 : 0;
    snafu = valueToWord[remainder] + snafu;
    decimal = Math.floor(decimal / 5);
  }
  return snafu;
}

// write a function to convert decimal to base 5
const decimalToBase5 = (decimal) => {
  let base5 = '';
  while(decimal > 0) {
    base5 = (decimal % 5) + base5;
    decimal = Math.floor(decimal / 5);
  }
  return base5;
}

console.log(decimalToSnafu(sum));

