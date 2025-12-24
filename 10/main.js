import fetchInput from "../fetch-input.mjs";

const realInput = await fetchInput(2025, 10);

const testInput = `[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`

let input = realInput.trim().split(/\r?\n/)

function generateMachineList(data) {
    const machineList = []
    for (let i = 0; i < data.length; i++) {
        const machine = data[i]
        const machineData = machine.split(' ')
        let machineObject = {}
        machineObject.joltageRequirements = machineData.pop()
        machineObject.joltageRequirements = machineObject.joltageRequirements.slice(1, machineObject.joltageRequirements.length -1).split(',')
        machineObject.targetLightDiagram = machineData[0].slice(1, machineData[0].length - 1)
        machineObject.buttons = [...machineData.slice(1).map(x => x.slice(1, x.length - 1).split(','))]
        machineList.push(machineObject)
    }
    return machineList
}

const countOnes = (str) => (str.match(/1/g) || []).length;

function generateOptions(buttonCount) {
    let count = 2**buttonCount
    const options = []
    const maxLength = (count -1).toString(2).length
    for (let i = 1; i < count; i++) {
        options.push(i.toString(2).padStart(maxLength, '0'))
    }
    
    return options.sort((a, b) => countOnes(a) - countOnes(b));
}

function pressButtons(buttons, buttonCombo, lightSize) {
    let lights = Array.from('.'.repeat(lightSize));
    for (let i = 0; i < buttonCombo.length; i++) {
        const buttonState = buttonCombo[i];
        if (buttonState === '1') {
            buttons[i].forEach(pos => {
                lights[pos] = lights[pos] === '.' ? '#' : '.'
            });
        }
    }
    return lights
}

function part1() {
    const machineList = generateMachineList(input)
    let total = 0;
    for (let i = 0; i < machineList.length; i++) {
        const machine = machineList[i];
        const buttonCombinations = generateOptions(machine.buttons.length)
        for (let j = 0; j < buttonCombinations.length; j++) {
            const combo = buttonCombinations[j];
            const finalLights = pressButtons(machine.buttons, combo, machine.targetLightDiagram.length)
            if (finalLights.join('') === machine.targetLightDiagram) {
                total += combo.replaceAll('0', '').length
                break;
            }            
            
        }
    }

    console.log(total);
    
}

part1()