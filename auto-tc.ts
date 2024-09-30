const fs = require('fs');

interface ClassItem {
    name: string;
    valids: string[] | string;
    invalids: string[] | string;
}

interface TestCase {
    [x: string]: string;
}

function getMaxValidItens(classes: ClassItem[]) {
    let maxValidItens = 1;
    for (const classItem of classes) {
        if (classItem.valids.length > maxValidItens) {
            maxValidItens = classItem.valids.length;
        }
    }
    return { maxValidItens };
}

function generateTestCases(classData: ClassItem[]): TestCase[] {
    const { maxValidItens } = getMaxValidItens(classData);

    const testCases: TestCase[] = [];

    for (let i = 0; i < maxValidItens; i++) {
        const elements = {};
        for (const classItem of classData) {
            if (i > classItem.valids.length - 1) {
                elements[classItem.name] = classItem.valids[0];
            } else {
                elements[classItem.name] = classItem.valids[i];
            }
        }
        testCases.push({
            type: 'valid',
            ...elements
        });
    }

    for (const classItem of classData) {
        for (const invalidField of classItem.invalids) {
            const elements: { [x: string]: string } = {};
            elements[classItem.name] = invalidField;
            for (const validElement of classData) {
                if (validElement.name != classItem.name) {
                    elements[validElement.name] = validElement.valids[0];
                }
            }
            testCases.push({
                type: 'invalid',
                ...elements
            });
        }
    }

    return testCases;
}

const classData = JSON.parse(
    fs.readFileSync('equivalence-classes.json', 'utf8')
);
const testCases = generateTestCases(classData);
fs.writeFileSync('test-cases.json', JSON.stringify(testCases, null, 4));
console.log('Generate test cases: ' + testCases.length.toString(10));
