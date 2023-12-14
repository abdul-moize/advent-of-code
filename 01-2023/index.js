const fs = require('fs');

const inputFile = 'input.txt';

const input = fs.readFileSync(inputFile, 'utf8').split('\n');

let sum = 0;

// write a function which finds the first & last digit in a string of alphanumeric characters
const findDigits = (str) => {
  let firstDigit = null;
  let lastDigit = null;
  for(let i = 0; i < str.length; i++) {
    if(+str[i]) {
      if (!firstDigit) firstDigit = +str[i];
      lastDigit = +str[i];
    }
  }
  return { firstDigit, lastDigit };
}



const findFirstAndLastDigits = (str) => {
  let firstDigit = null;
  let lastDigit = null;

  let firstPart = '';
  let secondPart = '';
  const validValues = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const conversion = { 'one': 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, 'eight': 8, 'nine': 9 };
  for(let i = 0, j = str.length - 1; i < str.length; i++, j--) {
    firstPart += str[i];
    secondPart = str[j] + secondPart;
    validValues.forEach((value) => {
      if (firstPart.includes(value) && !firstDigit) firstDigit = conversion[value] || +value;
      if (secondPart.includes(value) && !lastDigit) lastDigit = conversion[value] || +value;
    });

    if (firstDigit && lastDigit) break;
  }
  return { firstDigit, lastDigit };
}

input.forEach((line) => {
  const { firstDigit, lastDigit } = findDigits(line);
  console.log(line, firstDigit, lastDigit, +(`${firstDigit}${lastDigit}`))
  sum += +(`${firstDigit}${lastDigit}`);
})

console.log(sum);
