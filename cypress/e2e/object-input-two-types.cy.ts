import '../../src'

context('mixed types in the list', () => {
  const toString: TestCaseObject2<number, string> = {
    one: [1, '1'],
    ten: [10, '10'],
  }

  it.each(toString)((a, b) => {
    expect(String(a)).to.equal(b)
  })
})
