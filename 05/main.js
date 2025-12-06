import fetchInput from "../fetch-input.mjs";

const realInput = await fetchInput(2025, 5);

const testInput = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`

let [rangeInput, IDInput] = realInput.trim().split(/\r?\n\n/);

rangeInput = rangeInput.split(/\r?\n/).map(x => x.split('-').map(y => +y))
IDInput = IDInput.split(/\r?\n/).map(x => +x)

function part1() {
  let freshIDCount = 0;

  IDInput.forEach(id => {
    for (let i = 0; i < rangeInput.length; i++) {
      const range = rangeInput[i];
      if (id >= range[0] && id <= range[1]) {
        freshIDCount++
        break;
      }
    }
  });
  console.log(freshIDCount)
}

function part2() {
  rangeInput.sort(function (x, y) {
    return x[0] - y[0];
  });
  for (let i = 0; i < rangeInput.length - 1; i++) {
    const range = rangeInput[i];
    const compareTo = rangeInput[i + 1];
    if (range[1] >= compareTo[0]) {
      if (range[1] <= compareTo[1]) {
        rangeInput[i + 1] = [range[0], compareTo[1]]
        rangeInput[i] = [0, 0]
      } else if (range[1] > compareTo[1]) {
        rangeInput[i + 1] = [range[0], range[1]]
        rangeInput[i] = [0, 0]
      }
    }
  }

  let totalFreshIDCount = 0;

  rangeInput.forEach(x => {
    if (x[1] === 0 && x[0] === 0) {
      return;
    }

    totalFreshIDCount += (x[1] - x[0] + 1)
  })

  console.log(totalFreshIDCount)
}

part1()
part2()
