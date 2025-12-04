import fetchInput from "../fetch-input.mjs";

const realInput = await fetchInput(2025, 4);

const testInput = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`

const input = realInput.trim().split(/\r?\n/).map(x => x.split(''));

let checkPositions = [
  [-1, 0],  // N
  [-1, 1],  // NE
  [0, 1],   // E
  [1, 1],   // SE
  [1, 0],   // S
  [1, -1],  // SW
  [0, -1],  // W
  [-1, -1]  // NW
]

let yMax = input.length
let XMax = input[1].length

// Part 1

function part1() {
  let rollsAccessible1 = 0;

  input.forEach((row, y) => {
    row.forEach((pos, x) => {
      if (pos === '@') {
        let rollCount = 0;
        let accessible = true;
        for (let i = 0; i < checkPositions.length; i++) {
          let yCord = y + checkPositions[i][0];
          let xCord = x + checkPositions[i][1];
          if (-1 < yCord && yCord < yMax && -1 < xCord && xCord < XMax && input[yCord][xCord] === '@') {
            rollCount++
            if (rollCount == 4) {
              accessible = false;
              break;
            }
          }
        }
        if (accessible) {
          rollsAccessible1++;
        }
      }
    })
  })

  console.log(rollsAccessible1);
}

// Part 2

let rollsAccessible = 0;

function processGrid(grid) {
  let nextGrid = [];
  let rollsAccessibleBefore = rollsAccessible;

  grid.forEach((row, y) => {
    nextGrid.push([])
    row.forEach((pos, x) => {
      if (pos === '.') {
        nextGrid[y].push('.');
      } else if (pos === '@') {
        nextGrid[y].push('@');
        let rollCount = 0;
        let accessible = true;
        for (let i = 0; i < checkPositions.length; i++) {
          let yCord = y + checkPositions[i][0];
          let xCord = x + checkPositions[i][1];
          if (-1 < yCord && yCord < yMax && -1 < xCord && xCord < XMax && grid[yCord][xCord] === '@') {
            rollCount++
            if (rollCount == 4) {
              accessible = false;
              break;
            }
          }
        }
        if (accessible) {
          nextGrid[y][x] = '.'
          rollsAccessible++;
        }
      }
    })
  })
  if (rollsAccessibleBefore === rollsAccessible) {
    console.log(rollsAccessible);
  } else {
    processGrid(nextGrid)
  };
}

function part2() {
  processGrid(input)
}

part1()
part2()
