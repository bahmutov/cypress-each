import '../../src'

function add(a: number, b: number) {
  return a + b
}

const testCases = {
  // key: the test label
  // value: list of inputs for each test case
  'positive numbers': [1, 6, 7], // [a, b, expected result]
  'negative numbers': [1, -6, -5],
}

describe('converted to an array of arrays', () => {
  // we can convert the above object ourselves
  const pairs = Cypress._.toPairs(testCases)
  it.each(pairs)('testing %0', (title, numbers: number[]) => {
    const [a, b, expectedResult] = numbers
    expect(add(a, b)).to.equal(expectedResult)
  })
})
