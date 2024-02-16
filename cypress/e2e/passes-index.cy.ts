// @ts-check
/// <reference types="cypress" />

import '../..'

describe('passes index', () => {
  const items = ['foo', 'bar', 'baz']

  it.each(items)('index %K', (item, k) => {
    expect(k, `index ${k}`).to.be.within(0, items.length - 1)
    expect(item, `item ${item}`).to.equal(items[k])
  })
})
