function generateTestCases(equivalenceClasses) {
  const testCases = [];

  for (const [className, values] of Object.entries(equivalenceClasses)) {
    if (Array.isArray(values)) {
      // For discrete values, select one representative value
      testCases.push({ [className]: values[Math.floor(values.length / 2)] });
    } else if (typeof values === 'object' && values !== null) {
      // For ranges, test lower bound, upper bound, and a middle value
      const { min, max } = values;
      testCases.push(
        { [className]: min },
        { [className]: max },
        { [className]: Math.floor((min + max) / 2) }
      );
    }
  }

  return testCases;
}

// Example usage
const equivalenceClasses = {
  age: { min: 18, max: 65 },
  status: ['single', 'married', 'divorced', 'widowed'],
  income: { min: 0, max: 1000000 }
};

const generatedTestCases = generateTestCases(equivalenceClasses);
console.log(JSON.stringify(generatedTestCases, null, 2));