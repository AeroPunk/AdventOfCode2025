import fetchInput from "../fetch-input.mjs";

const realInput = await fetchInput(2025, 8);

const testInput = `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`

let input = realInput.trim().split(/\r?\n/).map(x => x.split(',').map(y => +y)).sort((a, b) => a[0] - b[0])

function calcDistance(A, B) {
    return Math.hypot(A[0] - B[0], A[1] - B[1], A[2] - B[2])
}

function generateDistanceMap(data, limit) {
    let distanceMap = new Map();
    for (let i = 0; i < data.length; i++) {
        const box1 = data[i];
        for (let ii = i+1; ii < data.length; ii++) {
            const box2 = data[ii];
            distanceMap.set(`${box1}-${box2}`, calcDistance(box1, box2))
        }   
    }
    distanceMap = new Map([...distanceMap.entries()].sort((a, b) => a[1] - b[1]).slice(0, limit))
    return distanceMap
}

function part1(count) {
    const distanceMap = generateDistanceMap(input, count);
    const circuits = [];
    let x = 0;

    for (const [key, value] of distanceMap) { 
        if (x < count) {
            x++
            const [junctionBoxA, junctionBoxB] = key.split('-');
            if (x === 1) {    // On the first loop, just add the circuit
                circuits.push(new Set([junctionBoxA, junctionBoxB]))
                continue;
            } 
            
            let foundInitialMatch = false;
            let initialMatchIndex = -1;

            for (let i = 0; i < circuits.length; i++) {
                const circuit = circuits[i];
                if (circuit.has(junctionBoxA) || circuit.has(junctionBoxB)) {
                    circuits[i].add(junctionBoxA).add(junctionBoxB)
                    initialMatchIndex = i
                    foundInitialMatch = true;
                    break;
                }
            }

            if (foundInitialMatch) {
                for (let ii = initialMatchIndex + 1; ii < circuits.length; ii++) {
                    const circuit = circuits[ii];
                    if (circuit.has(junctionBoxA) || circuit.has(junctionBoxB)) {
                        circuits[initialMatchIndex] = circuits[initialMatchIndex].union(circuit)
                        circuits.splice(ii, 1)
                        break;
                    }
                }
                continue
            }
            
            circuits.push(new Set([junctionBoxA, junctionBoxB]))

        } else {
            break;
        }
    
    }
    circuits.sort((a, b) => b.size - a.size)
    
    console.log('Part 1:', circuits[0].size * circuits[1].size * circuits[2].size)
    
}

function part2() {
    const distanceMap = generateDistanceMap(input, undefined);
    const circuits = [];

    for (const [key, value] of distanceMap) {            
        const [junctionBoxA, junctionBoxB] = key.split('-');
        if (circuits.length === 0) {    // On the first loop, just add the circuit
            circuits.push(new Set([junctionBoxA, junctionBoxB]))
            continue;
        } 
        
        let foundInitialMatch = false;
        let initialMatchIndex = -1;

        for (let i = 0; i < circuits.length; i++) {
            const circuit = circuits[i];
            if (circuit.has(junctionBoxA) || circuit.has(junctionBoxB)) {
                circuits[i].add(junctionBoxA).add(junctionBoxB)
                initialMatchIndex = i
                foundInitialMatch = true;
                break;
            }
        }

        if (foundInitialMatch) {
            for (let ii = initialMatchIndex + 1; ii < circuits.length; ii++) {
                const circuit = circuits[ii];
                if (circuit.has(junctionBoxA) || circuit.has(junctionBoxB)) {
                    circuits[initialMatchIndex] = circuits[initialMatchIndex].union(circuit)
                    circuits.splice(ii, 1)
                    break;
                }
            }
            if (circuits.length === 1 && circuits[0].size === input.length) {
                console.log('Part 2:', junctionBoxA.split(',')[0] * junctionBoxB.split(',')[0])
                break;
            }
            continue
        }
        
        circuits.push(new Set([junctionBoxA, junctionBoxB]))

    }
    
}

part1(10)

part2()