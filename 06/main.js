import fetchInput from "../fetch-input.mjs";

const realInput = await fetchInput(2025, 6);

const testInput = `
123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `

let input = realInput.trim().split(/\r?\n/).map(x => x.trim().split(/\s+/).map(y => y === '+' || y === '*' ? y : +y));

function part1() {
  let grandTotal = 0;
  let calculationLenght = input.length;
  input[calculationLenght - 1].forEach((calcOperator, x) => {

    let calculationTotal = calcOperator === '*' ? 1 : 0; // Start with 1 for multiplication, 0 for addition

    for (let i = 0; i < calculationLenght - 1; i++) {
      const value = input[i][x]
      calculationTotal = calcOperator === '*' ? calculationTotal * value : calculationTotal + value;
    }
    grandTotal += calculationTotal
  });
  console.log(grandTotal)
}

part1()

// Part 2

let input2 = realInput.trim().split(/\r?\n/);

function doCalc(values, operator) {
  let calculationTotal = operator === '*' ? 1 : 0; // Start with 1 for multiplication, 0 for addition

  values.forEach(value => {
    calculationTotal = operator === '*' ? calculationTotal * value : calculationTotal + value;
  });

  return calculationTotal;
}

function part2() {
  // make sure all horizontal rows are the same length by adding whitespace to the operator row
  input2[input2.length - 1] = input2[input2.length - 1].padEnd(input2[0].length, ' ')

  const columnHeight = input2.length
  let grandTotal = 0
  let valueList = []

  for (let i = input2[0].length - 1; i >= 0; i--) {         // Because all rows are the same length, just loop backwards over the first one
    const operator = input2[columnHeight - 1][i]            // The operator (when present) is in the last row of each column
    const chars = []

    for (let ii = 0; ii < columnHeight - 1; ii++) {         // Loop over every row in the current column (i) except the last one, because that is the operator (or empty)
      chars.push(input2[ii][i])
    }

    if (chars.every(x => x === ' ') && operator === ' ') {  // The whole column is empty -> Go the the next column, which is a new calculation
      continue
    } else if (operator === ' ') {                          // Only the operator row is empty -> This column is a new digit in the current calculation
      valueList.push(+`${chars.join('').trim()}`)           
    } else {
      valueList.push(+`${chars.join('').trim()}`)           // Else there are digits and an operator -> This is the last digit of the calculation because the operator is also present 
      grandTotal += doCalc(valueList, operator)             // Do the calculation
      valueList = []
    }
  }

  console.log(grandTotal)
}

part2()
