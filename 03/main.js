import fetchInput from "../fetch-input.mjs";

const realInput = await fetchInput(2025, 3);

const testInput = `987654321111111
811111111111119
234234234234278
818181911112111`

const input = realInput.trim().split(/\r?\n/).map(x => x.split('').map(y => +y));

// Part 1

function part1() {
  let total = 0;

  input.forEach(bank => {
    let firstNumber = Math.max(...bank.slice(0, -1))
    let secondNumber = Math.max(...bank.slice(bank.indexOf(firstNumber) + 1))
    let finalNumber = +`${firstNumber}${secondNumber}`
    total += finalNumber;
  });

  console.log(total)
}

// Part 2

function part2() {
  let total = 0;

  input.forEach(bank => {
    let finalNumbers = []
    let joltageLine = [...bank]
    for (let i = -11; i < 1; i++) {
      let nextNumber = Math.max(...joltageLine.slice(0, i < 0 ? i : undefined))
      finalNumbers.push(nextNumber);
      joltageLine = joltageLine.slice(joltageLine.indexOf(nextNumber) + 1)
    }
    total += +finalNumbers.join('');
  });
  console.log(total)
}

part1()
part2()