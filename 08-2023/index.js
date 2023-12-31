const fs = require('fs');

const inputFile = 'input.txt';

const input = fs.readFileSync(inputFile, 'utf8').split('\n');

const directions = input[0];
let steps = 0;
let totalSteps = 0;

const startingNodes = [];
let nextNode = 'AAA';

const graph = {};
for (let i = 2; i < input.length; i++) {
  const [node, edges] = input[i].split(' = ');

  graph[node] = edges.slice(1, -1).split(', ');
  if (node.endsWith('A')) {
    startingNodes.push(node);
  }
}

const nextNodes = [...startingNodes];

// Part 1

while (nextNode !== 'ZZZ') {
  const step = directions[steps] === 'R' ? 1 : 0;
  steps = (steps + 1) % directions.length;

  nextNode = graph[nextNode][step];
  totalSteps++;
}

console.log('Part1:',totalSteps);

totalSteps = 0;


// Part 2
let endingPoints = [];
while(!nextNodes.every((node, index) => (totalSteps > 0 && startingNodes[index] === node) || node.endsWith('Z'))) {
  for (let i = 0; i < nextNodes.length; i++) {
    if ((nextNodes[i] === startingNodes[i] && totalSteps > 0)) continue;
    const node = nextNodes[i];
    const step = directions[steps] === 'R' ? 1 : 0;
    nextNodes[i] = graph[node][step];

    if (nextNodes[i].endsWith('Z')) {
      endingPoints.push([nextNodes[i], totalSteps + 1]);
    }
  }
  steps = (steps + 1) % directions.length;
  totalSteps++;
  if (endingPoints.length === 6) break;
}

const gcd = (a, b) => {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
};

const lcm = (arr) => {
  let result = arr[0];
  for (let i = 1; i < arr.length; i++) {
    result = (result * arr[i]) / gcd(result, arr[i]);
  }
  return result;
};

console.log('Part2:', lcm(endingPoints.map( p => p[1])));

