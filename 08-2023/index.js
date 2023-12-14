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

// while (nextNode !== 'ZZZ') {
//   const step = directions[steps] === 'R' ? 1 : 0;
//   steps = (steps + 1) % directions.length;
//   console.log(step, steps, nextNode, graph[nextNode])
//   nextNode = graph[nextNode][step];
//   totalSteps++;
// }


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

console.log(endingPoints.reduce((acc, point) => acc * point[1], 1));


console.log(startingNodes);
console.log(nextNodes);

console.log(totalSteps);
// write a function to calculate least common multiple of numbers in an array

const lcm = (arr) => {
  const max = Math.max(...arr);
  let multiple = max;
  while (true) {
    if (arr.every(num => multiple % num === 0)) {
      return multiple;
    }
    multiple += max;
  }
}

console.log(lcm(endingPoints.map( p => p[1])));

