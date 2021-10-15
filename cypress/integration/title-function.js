// @ts-check
/// <reference types="cypress" />

import '../../src'

function makeTestTitle(s, k, strings) {
  expect(s, 'first argument is the item').to.equal('foo')
  expect(k, 'second argument is the index').to.equal(0)
  expect(strings, 'all items').to.deep.equal(['foo'])
}

it.each(['foo'])(makeTestTitle, (s) => {
  expect(s, 'item value').to.equal('foo')
})
