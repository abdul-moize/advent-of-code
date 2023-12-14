const fs = require('fs');

const inputFile = 'input.txt';

const input = fs.readFileSync(inputFile, 'utf8').split('\n');

// let product = 1;
// const convertor = {
//   t: 10,
//   j: 11,
//   q: 12,
//   k: 13,
//   a: 14,
// };

// const hands = [];
// const ranks = [
//   { 1: 5 }, // high card
//   { 1: 3, 2: 1 }, // one pair
//   { 1: 1, 2: 2 }, // two pair
//   { 3: 1, 1: 2 },// three of a kind
//   { 3: 1, 2: 1 }, // full house
//   { 4: 1, 1: 1 }, // four of a kind
//   { 5: 1 }, // five of a kind
// ];
// for (let i = 0; i < input.length; i++) {
//   const [hand, bid] = input[i].split(' ');
//   const counts = {};
//   const pairCounts = {};
//   const handArr = hand.split('');
//   let maxCount = 0;
//   handArr.forEach((card) => {
//     counts[card] = (counts[card] || 0) + 1;
//     if (counts[card] > maxCount) maxCount = counts[card];
//   });
//   Object.values(counts).forEach((count) => {
//     pairCounts[count] = (pairCounts[count] || 0) + 1;
//   });
//   let handRank = 0;
//   for (let i = 0; i < ranks.length; i++) {
//     const rank = ranks[i];

//     handRank = Object.keys(rank).every((key) => pairCounts[key] === rank[key]) ? i + 1: handRank;
//   }
//   hands.push([
//     handRank,
//     hand.split('').map((card) => convertor[card.toLowerCase()] || +card),
//     +bid,
//   ]);
// }

// hands.sort(([r1, h1], [r2, h2]) => {
//   if ( r1 !== r2) return r1 > r2 ? 1 : -1;

//   for (let i = 0; i < h1.length; i++) {
//     console.log(h1[i], h2[i]);
//     if (h1[i] !== h2[i]) return h1[i] > h2[i] ? 1 : -1;
//   }
// });

// console.log(hands.reduce((acc, [_, __, bid], rank) => acc + (bid * (rank + 1)), 0));

let product = 1;
const convertor = {
  t: 10,
  j: 0,
  q: 12,
  k: 13,
  a: 14,
};

const hands = [];
const ranks = [
  [{ 1: 5 }], // high card
  [
    { 1: 3, 2: 1 },
    { 1: 4, 0: 1 },
  ], // one pair
  [
    { 1: 1, 2: 2 },
    { 2: 1, 1: 2, 0: 1 },
  ], // two pair
  [
    { 3: 1, 1: 2 },
    { 2: 1, 1: 2, 0: 1 },
    { 1: 2, 0: 3 },
    { 1: 3, 0: 2 },
  ], // three of a kind
  [
    { 3: 1, 2: 1 },
    { 3: 1, 1: 1, 0: 1 },
    { 2: 2, 0: 1 },
  ], // full house
  [
    { 4: 1, 1: 1 },
    { 3: 1, 0: 1, 1: 1 },
    { 2: 1, 0: 2, 1: 1 },
    { 1: 2, 0: 3 },
  ], // four of a kind
  [
    { 5: 1 },
    { 4: 1, 0: 1 },
    { 3: 1, 0: 2 },
    { 2: 1, 0: 3 },
    { 1: 1, 0: 4 },
    { 0: 5 },
  ], // five of a kind
];
for (let i = 0; i < input.length; i++) {
  const [hand, bid] = input[i].split(' ');
  const counts = {};
  const pairCounts = {};
  const handArr = hand.split('');
  let maxCount = 0;
  handArr.forEach((card) => {
    counts[card] = (counts[card] || 0) + 1;
    if (counts[card] > maxCount) maxCount = counts[card];
  });
  for (let card in counts) {
    const count = counts[card];
    pairCounts[card === 'J' ? '0' : count] =
      card === 'J' ? count : (pairCounts[count] || 0) + 1;
  }
  let handRank = 0;
  for (let i = 0; i < ranks.length; i++) {
    const rank = ranks[i];

    for (let j = 0; j < rank.length; j++) {
      const r = rank[j];
      handRank = Object.keys(r).every((key) => pairCounts[key] === r[key])
        ? i + 1
        : handRank;
      // if( bid === '521') {
      //   if (j === 0) console.log('');
      //   console.log(handRank, r, pairCounts)
      // };
    }
  }
  

  hands.push([
    handRank,
    hand.split('').map((card) => convertor[card.toLowerCase()] ?? +card),
    +bid,
  ]);
}

hands.sort(([r1, h1], [r2, h2]) => {
  if (r1 !== r2) return r1 > r2 ? 1 : -1;

  for (let i = 0; i < h1.length; i++) {
    if (h1[i] !== h2[i]) return h1[i] > h2[i] ? 1 : -1;
  }
});

hands.filter(h => h[0] === 3).forEach((h) => console.log(`${h}`));

console.log(
  hands.reduce((acc, [_, __, bid], rank) => acc + bid * (rank + 1), 0)
);
