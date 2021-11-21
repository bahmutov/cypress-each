// @ts-check
/// <reference types="cypress" />

import '../..'

describe('_.sampleSize', () => {
  const items = [1, 2, 3, 4]

  // pick two elements from the array
  const n = it.each(Cypress._.sampleSize(items, 2))(
    'checks %K sample %d',
    (x) => {
      expect(x, 'one of the four').to.be.oneOf(items)
      expect(n, 'number of created tests').to.equal(2)
    },
  )
})
