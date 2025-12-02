import fetchInput from "../fetch-input.mjs";

const realInput = await fetchInput(2025, 2);

const testInput = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`

const input = realInput.trim().split(',').map(x => x.split('-').map(y => +y));

// Part 1

function part1() {
  let total = 0;

  input.forEach(line => {
    let startIndex = line[0];
    let endIndex = line[1];

    for (let i = startIndex; i <= endIndex; i++) {
      let idString = i.toString();

      if (idString.length % 2 !== 0) {
        continue;
        // No need to check id's that don't have 2 equal halves
      }

      if (idString.slice(0, idString.length / 2) === idString.slice(idString.length / 2)) {
        total += i;
      }
    }
  });
  console.log(total)
}

// Part 2

function chunkString(string, chunkSize) {
  let chunks = [];
  for (let i = 0; i < string.length; i += chunkSize) {
    chunks.push(string.substring(i, i + chunkSize));
  }
  return chunks;
}

function part2() {
  let total = 0;

  input.forEach(line => {
    let startIndex = line[0];
    let endIndex = line[1];

    for (let i = startIndex; i <= endIndex; i++) {
      let idString = i.toString();
      let idIsInvalid = false;

      for (let patternLength = 1; patternLength <= Math.trunc(idString.length / 2); patternLength++) {      // Check every pattern size that fits in the ID
        let chunks = chunkString(idString, patternLength);

        if (chunks.every(x => x == chunks[0])) {                                              // Check if every chunk is the same and break out of the loop to count that ID
          idIsInvalid = true;
          break;
        }
      }
      if (idIsInvalid) {
        total += i;
      }
    }
  });
  console.log(total)
}

part1()
part2()