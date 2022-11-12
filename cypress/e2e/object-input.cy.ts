import '../../src'

function add(a: number, b: number) {
  return a + b
}
// https://github.com/bahmutov/cypress-each/issues/53
describe('automatic conversion', () => {
  context('plain values', () => {
    const evenCases = {
      two: 2,
      four: 4,
    }

    function isEven(x: number) {
      return x % 2 === 0
    }

    it.each(evenCases)((x) => {
      expect(isEven(x)).to.be.true
      expect(x).to.be.a('number')
      expect(x).to.satisfy(isEven)
    })
  })
})
