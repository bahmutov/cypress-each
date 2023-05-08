import '../../src'

describe('Array of arrays', () => {
  it.each([
    [1, 'foo', true],
    [2, 'bar', false],
  ])('test with %d %s', (a: number, b: string, c: boolean) => {
    // a should be a number
    // b should be a string
    // b should be a boolean
    expect(a, 'first argument').to.be.a('number')
    expect(b, 'second argument').to.be.a('string')
    expect(c, 'third argument').to.be.a('boolean')
  })
})
