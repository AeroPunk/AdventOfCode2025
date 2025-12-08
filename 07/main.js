import fetchInput from "../fetch-input.mjs";

const realInput = await fetchInput(2025, 7);

const testInput = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`

let input = realInput.trim().split(/\r?\n/).map(x => x.split(''))

function part1() {
  const maxColumnIndex = input.length - 1
  const maxRowIndex = input[1].length - 1

  let splitCount = 0;

  // Draw the first line in the middle of row 2
  input[1][maxRowIndex / 2] = '|'

  // Loop starting on the second row and ending on the second-to-last row
  for (let y = 1; y < maxColumnIndex; y++) {
    const row = input[y];
    for (let x = 0; x < row.length; x++) {
      const char = row[x]
      if (char === '|') {
        if (input[y + 1][x] === '.') {
          input[y + 1][x] = '|'
        } else if (input[y + 1][x] === '^') {
          splitCount++
          input[y + 1][x - 1] = '|'
          input[y + 1][x + 1] = '|'
        }
      }
    }
  }
  console.log(splitCount)
}

part1()

// Part 2

let input2 = realInput.trim().split(/\r?\n/).map(x => x.split(''))

function part2() {
  const maxColumnIndex = input2.length - 1
  const maxRowIndex = input2[1].length - 1

  // Draw the first line in the middle of row 2
  input2[1][maxRowIndex / 2] = 1

  // Loop starting on the second row and ending on the second-to-last row
  for (let y = 1; y < maxColumnIndex; y++) {
    const row = input2[y];
    for (let x = 0; x < row.length; x++) {
      const char = row[x]
      if (typeof char === "number") {
        if (input2[y + 1][x] === '.') {
          input2[y + 1][x] = char
        } else if (input2[y + 1][x] === '^') {
          // left of split
          if (input2[y + 1][x - 2] === '^') {
            input2[y + 1][x - 1] = [row[x - 2], row[x - 1], row[x]].reduce((total, x) => typeof x === 'number' ? total + x : total, 0)
          } else {
            input2[y + 1][x - 1] = typeof row[x - 1] === 'number' ? char + row[x - 1] : char;
          }

          // right of split
          if (input2[y + 1][x + 2] === '^') {
            input2[y + 1][x + 1] = [row[x + 2], row[x + 1], row[x]].reduce((total, x) => typeof x === 'number' ? total + x : total, 0)
          } else {
            input2[y + 1][x + 1] = typeof row[x + 1] === 'number' ? char + row[x + 1] : char;
          }
        }
      }
    }
  }
  console.log(input2[maxColumnIndex].reduce((total, x) => typeof x === 'number' ? total + x : total, 0))
}

part2()