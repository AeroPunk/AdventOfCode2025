import fetchInput from "../fetch-input.mjs";

const realInput = await fetchInput(2025, 9);

const testInput = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`

let input = realInput.trim().split(/\r?\n/).map(x => x.split(',').map(y => +y))

function part1() {
    let maxSurface = 0
    let pointsCount = input.length

    for (let i = 0; i < input.length; i++) {
        const pointA = input[i];
        for (let ii = i + 1; ii < input.length; ii++) {
            const pointB = input[ii];
            let surface = (Math.abs(pointA[0] - pointB[0]) + 1) * (Math.abs(pointA[1] - pointB[1]) + 1)
            maxSurface = surface > maxSurface ? surface : maxSurface
        }
    }

    console.log(maxSurface)
}

part1()
