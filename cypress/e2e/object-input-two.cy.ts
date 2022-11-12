import '../../src'

context('array with 2 arguments', () => {
  const lessThan: TestCaseObject2<number, number> = {
    'one is less than two': [1, 2],
    'ten is less than twenty': [10, 20],
  }

  it.each(lessThan)((a, b) => {
    expect(a).to.be.lessThan(b)
  })
})
