// @ts-check
/// <reference types="cypress" />

import '../..'

describe('Using %k and %K placeholders', () => {
  it('has test title', function () {
    expect(this, 'has test').to.have.property('test')
    // @ts-ignore
    expect(this.test.title).to.equal('has test title')
  })

  it.each([1, 2, 3])('has 0-based index %k', function (x) {
    expect(x).to.be.oneOf([1, 2, 3])
    // needs test context to be passed correctly by it.each
    // expect(this.test.title).to.equal('has 0-based index 0')
  })

  it.each([1, 2, 3])('has 1-based index %K', (x) => {
    expect(x).to.be.oneOf([1, 2, 3])
  })
})
