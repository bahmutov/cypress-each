import '../../src'

context('mixed types in the list', () => {
  const additions: TestCaseObject3<number, number, string> = {
    one: [1, 2, '3'], // a + b in string form
    ten: [10, 20, '30'],
  }

  it.each(additions)((a, b, s) => {
    expect(String(a + b)).to.equal(s)
  })
})
