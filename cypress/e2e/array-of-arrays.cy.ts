import '../../src'

// https://github.com/bahmutov/cypress-each/issues/2
describe('Array of arrays', () => {
  it.each([
    [1, 'foo'],
    [2, 'bar'],
  ])('test with %d %s', (a, b) => {
    // a should be a number
    // b should be a string
    expect(a, 'first argument').to.be.a('number')
    expect(b, 'second argument').to.be.a('string')
  })
})
