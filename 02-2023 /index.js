const fs = require('fs');

const inputFile = 'input1.txt';

const input = fs.readFileSync(inputFile, 'utf8').split('\n');

let sum = 0;

input.forEach((line, index) => {
  const[gameNumber, gameDetails] = line.split(':');
  // let isValid = true;
  // const colorToLimit = { 'red': 12, 'green': 13, 'blue': 14 }
  // gameDetails.split(';').forEach((game) => {
  //   const balls = game.split(',');
  //   balls.forEach((ball) => {
  //     const [count, color] = ball.trim().split(' ');
  //     if (count > colorToLimit[color]) isValid = false;
  //   })
  // });
  // if (isValid) sum += (index + 1);

  const colorToMinRequired = { 'red': 0, 'green': 0, 'blue': 0 }
  gameDetails.split(';').forEach((game) => {
    const balls = game.split(',');
    balls.forEach((ball) => {
      const [count, color] = ball.trim().split(' ');
      if (+count > colorToMinRequired[color]) colorToMinRequired[color] = +count;
    })
  });

  const { red, blue, green } = colorToMinRequired;
  const product = red * blue * green;
  sum += product;
});

console.log(sum);
