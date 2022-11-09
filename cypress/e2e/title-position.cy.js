// @ts-check
/// <reference types="cypress" />

import '../../src'

describe('Positional title arguments', () => {
  const list = [['foo', 'main']]

  it.each(list)('title is %1 and %0', function (a, b) {
    expect(a, 'first').to.equal(a)
    expect(b, 'second').to.equal(b)
    // @ts-ignore
    expect(this.test.title, 'computed test title').to.equal(
      'title is main and foo',
    )
  })
})
