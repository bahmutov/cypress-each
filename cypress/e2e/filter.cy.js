// @ts-check
/// <reference types="cypress" />

import '../../src'

describe('filter function', () => {
  const items = [1, 2, 3, 4]

  const n = it.each(items, (x, k) => x === 4)(
    'only the last item matches %d',
    (x) => {
      expect(x).to.equal(4)
      expect(n, 'number of created tests').to.equal(1)
    },
  )

  it.each(items, (x, k) => k === 1)(
    'only allows the 2nd item by index %d',
    (x) => {
      expect(x).to.equal(2)
    },
  )
})
