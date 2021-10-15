// @ts-check
/// <reference types="cypress" />

import '../../src'

it('has test title', function () {
  expect(this, 'has test').to.have.property('test')
  // @ts-ignore
  expect(this.test.title).to.equal('has test title')
})

it.each([1])('has test context', function (x) {
  expect(x).to.equal(1)
  // needs test context to be passed correctly by it.each
  expect(this, 'has test').to.have.property('test')
  // @ts-ignore
  expect(this.test.title).to.equal('has test context')
})

it.each([[1, 2]])('has test context inside an array', function (x, y) {
  expect(x).to.equal(1)
  expect(y).to.equal(2)
  // needs test context to be passed correctly by it.each
  expect(this, 'has test').to.have.property('test')
  // @ts-ignore
  expect(this.test.title).to.equal('has test context inside an array')
})
