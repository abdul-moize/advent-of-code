const fs = require('fs');

const inputFile = 'input.txt';

const input = fs.readFileSync(inputFile, 'utf8').split('\n').filter(v => !!v);

let sum = 0;

const mapping = {};

const seeds = input[0].split(':')[1].trim().split(' ').filter(v => !!v).map(y => +y);

let results = seeds.map((seed) => ({ seed }));
let minLocation = null;

const getCombinedKey = (key1 = '', key2 = '') => `${key1}-${key2}`;

let key1 = '', key2 = '';
for(let i = 1; i < input.length; i++) {
  if (input[i].includes('map')) {
    [key1, key2] = input[i].split(' ')[0].replace('-to-', ' ').split(' ');
    mapping[getCombinedKey(key1, key2)] = {};
    continue;
  }
  const key = getCombinedKey(key1, key2);
  const [dest, source, range] = input[i].split(' ').map(v => +v);
  mapping[key][source] = { dest, range };
  // for (let j = 0; j < results.length; j++) {
  //   const result = results[j];
  //   if (result[key1] >= source && result[key1] < source + range) {
  //     result[key2] = result[key1] + (dest - source) ;
  //     if (!minLocation || result.location < minLocation)  minLocation = result.location;
  //     continue;
  //   }

  //   if (!result[key2]) result[key2] = result[key1];
  //   if (!minLocation || result.location < minLocation)  minLocation = result.location;
  // }
}
// console.log(results.reduce((acc, result) => !acc || result.location < acc ? result.location : acc, null));
// source - source + range
// seed[i-1] - seed[i-1] + seed[i]

results = [];
for (let key in Object.fromEntries(Object.entries(mapping).reverse())) {
  const [key1, key2] = key.split('-');
  for (let sourceString in mapping[key]) {
    const source = +sourceString;
    const { dest, range } = mapping[key][source];
    const result = { [key2]: dest, [key1]: source };

  }
}

console.log(mapping);


