// @ts-check
/// <reference types="cypress" />

import '../..'

describe('Simply repeating the test N times', () => {
  it.each(5)('test %K of 5', function (k) {
    expect(k).to.be.within(0, 4)
  })
})

describe.each(3)('suite %K of 3', function (k) {
  it('works', () => {
    expect(k).to.be.within(0, 2)
  })
})
