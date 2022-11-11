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
  it.each(pairs)('testing %0', (title, numbers) => {
    const [a, b, expectedResult] = numbers
    expect(add(a, b)).to.equal(expectedResult)
  })
})

// https://github.com/bahmutov/cypress-each/issues/53
describe('automatic conversion', () => {
  it.each(testCases)((a: number, b: number, expectedResult: number) => {
    expect(add(a, b)).to.equal(expectedResult)
  })

  context('plain values', () => {
    const evenCases = {
      two: 2,
      four: 4,
    }

    function isEven(x: number) {
      return x % 2 === 0
    }

    it.each(evenCases)((x) => {
      expect(x).to.satisfy(isEven)
    })
  })
})
