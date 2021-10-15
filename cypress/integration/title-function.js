// @ts-check
/// <reference types="cypress" />

import '../../src'

/**
 * Forms the test title from the item and index
 * @param {string} s Individual string
 * @param {number} k Item index (0-based)
 * @param {string[]} strings All strings
 * @returns
 */
function makeTestTitle(s, k, strings) {
  expect(s, 'first argument is the item').to.equal('foo')
  expect(k, 'second argument is the index').to.equal(0)
  expect(strings, 'all items').to.deep.equal(['foo'])

  return `test ${k + 1} for "${s}"`
}

describe('Form test title using a function', () => {
  it.each(['foo'])(makeTestTitle, function (s) {
    expect(s, 'item value').to.equal('foo')
    // @ts-ignore
    expect(this.test.title, 'computed test title').to.equal('test 1 for "foo"')
  })
})
