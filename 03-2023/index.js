const fs = require('fs');

const inputFile = 'input.txt';

const input = fs.readFileSync(inputFile, 'utf8').split('\n');

let sum = 0;

const findNumber = (row, column, direction) => {
  let number = input[row][column];
  for (let i = 1; i < 3; i++) {
    const digit = +input[row][column + i * direction];
    if (isNaN(digit)) break;
    if (row === 138 && column === 90) {
      // console.log(digit, number);
    }
    number = (direction === -1 ? `${digit}${number}` : `${number}${digit}`);
  }
  return +number;
}

const filterRow = (row, column) => {
  const value = input[row][column];
  const numbers = [];
  if (+value >= 0) {
    let goLeft = true;
    let goRight = true;
    let number = value;
    for (let i = 1; goLeft || goRight; i++) {
      const leftDigit = +input[row][column - i];
      const rightDigit = +input[row][column + i];
      goLeft = goLeft && leftDigit >= 0;
      goRight = goRight && rightDigit >= 0;
      
      if (goLeft) number = `${leftDigit}${number}`;
      
      if (goRight) number = `${number}${rightDigit}`;
      if (row === 137 && column === 133) {
        // console.log(leftDigit, rightDigit, number);
      }
    }
    numbers.push(+number);
  } else {
    if (+input[row][column - 1] >= 0) numbers.push(findNumber(row, column - 1, -1));
    if (+input[row][column + 1] >= 0) numbers.push(findNumber(row, column + 1, 1));
  }

  return numbers;
}
for(let i = 0; i < input.length; i++) {
  // let start = null;
  // let end = null

  // for (let j = 0; j < input.length + 1; j++) {
  //   if (+input[i][j] >= 0) {
  //     if (start === null) start = j;
  //     end = j;
  //   } else if (start !== null && end !== null) {

  //     directions = [[-1,-1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
  //     let isValid = false;
  //     for(let k = start; k <= end; k++) { 
  //       for (let l = 0; l < directions.length; l++) {
  //         const [x, y] = directions[l];
  //         if (input[i + x] && input[i + x][k + y] && isNaN(+input[i + x][k + y]) && input[i + x][k + y] !== '.') {
  //           isValid = true;
  //           break;
  //         }
  //       }
  //       if (isValid) break;
  //     }

  //     if (isValid) sum += (+input[i].slice(start, end + 1));
  //     start = null;
  //     end = null;
  //   }
  // }

  directions = [[-1,-1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
  const digits = '0123456789';
  let numbers = [];
  let isValid = false;
  for (let j = 0; j < input.length + 1; j++) {
    isValid = false;
    numbers = [];
    if (input[i][j] === '*') {
      isValid = true;
      if (digits[input[i][j - 1]]) numbers.push(findNumber(i, j - 1, -1));

      if (digits[input[i][j + 1]]) numbers.push(findNumber(i, j + 1, 1));

      numbers = [...numbers, ...filterRow(i - 1, j)];
      numbers = [...numbers, ...filterRow(i + 1, j)];
    } 
    if (isValid) console.log(i, j, numbers);

    if (numbers.length > 1) sum += numbers[0] * numbers[1];
  }
}

console.log(sum);
