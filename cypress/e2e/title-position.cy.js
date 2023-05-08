// @ts-check
/// <reference types="cypress" />

import '../../src'

describe('Positional title arguments', () => {
  const list = [['foo', 'main']]

  // https://github.com/bahmutov/cypress-each/issues/76
  // @ts-ignore
  it.each(list)('title is %1 and %0', (a, b) => {
    expect(a, 'first').to.equal('foo')
    expect(b, 'second').to.equal('main')
    // @ts-ignore
    expect(this.test.title, 'computed test title').to.equal(
      'title is main and foo',
    )
  })
})
