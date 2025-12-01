import fetchInput from "../fetch-input.mjs";

const realInput = await fetchInput(2025, 1);

const testInput = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82
`

const input = realInput.trim().split(/\r?\n/);

// Part 1
let dial = 50;
let zeroCounter = 0;

input.forEach(line => {
  // Turn the dial
  if (line[0] === 'L') {
    dial -= +line.slice(1);
  } else {
    dial += +line.slice(1);
  }

  // Correct for going below 0 or over 99
  if (dial < 0) {
    dial = 100 + (dial % 100);
  }
  if (dial > 99) {
    dial = dial % 100;
  }

  // Count the times it stops on 0
  if (dial === 0) {
    zeroCounter++;
  }
});

console.log('Answer Part 1:', zeroCounter)

// Part 2
dial = 50;
zeroCounter = 0;

input.forEach(line => {
  let turnDirection = line[0];
  let turnAmount = +line.slice(1);
  let lastDial = dial;

  zeroCounter += Math.floor(turnAmount / 100)

  turnAmount = turnAmount % 100;

  if (turnDirection === 'L') {
    dial -= turnAmount;
  } else {
    dial += turnAmount;
  }

  if (dial === 0 || dial === 100) {
    zeroCounter++;
    dial = 0;
  } else if (dial < 0) {
    dial = 100 + dial;
    if (lastDial !== 0) {
      zeroCounter++
    }
  } else if (dial > 100) {
    dial = dial - 100;
    if (lastDial !== 0) {
      zeroCounter++;
    }
  }
});


console.log('Answer Part 2:', zeroCounter)