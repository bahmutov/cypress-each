import '../../src'

function add(a: number, b: number) {
  return a + b
}

type TestCases = { [index: string]: [number, number, number] }

const testCases: TestCases = {
  // key: the test label
  // value: list of inputs for each test case
  'positive numbers': [1, 6, 7], // [a, b, expected result]
  'negative numbers': [1, -6, -5],
}

it.each(testCases)((a: number, b: number, expectedResult: number) => {
  expect(add(a, b)).to.equal(expectedResult)
})
