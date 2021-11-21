// @ts-check
/// <reference types="cypress" />

import '../../src'

describe('nth item', () => {
  const items = [1, 2, 3, 4]

  context('every 2nd', () => {
    // take every 2nd item, same as taking the item's zero-index module 2
    const n = it.each(items, 2)('every 2nd item %K', (x) => {
      expect(x, '1 or 3').to.be.oneOf([1, 3])
      expect(n, 'number of created tests').to.equal(2)
    })
  })

  context('every 3nd', () => {
    const n = it.each(items, 3)('every 3nd item %K', (x) => {
      expect(x, '1 or 4').to.be.oneOf([1, 4])
      expect(n, 'number of created tests').to.equal(2)
    })
  })
})
