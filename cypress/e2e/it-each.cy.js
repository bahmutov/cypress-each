// @ts-check
/// <reference types="cypress" />

import '../..'

describe('using it.each', () => {
  it.each(['A', 1])('checks %s', (x) => {
    cy.wrap(x).should('equal', x)
  })

  it.each([['A', 'a']])('capital letter %s !== %s', (X, x) => {
    cy.wrap(X).should('not.equal', x)
  })

  it.each([
    { name: 'Joe', age: 30 },
    { name: 'Mary', age: 20 },
  ])('has correct types', (user) => {
    expect(user).to.have.keys('name', 'age')
    expect(user.name).to.be.a('string')
    expect(user.age).to.be.a('number')
  })

  it.each([
    [1, 'foo'],
    [2, 'bar'],
  ])('title', (a, b) => {
    expect(a).to.be.a('number')
    expect(b).to.be.a('string')
    expect(b.length).to.equal(3)
  })
})

// just an example for checking the thrown error
// it.each()('throws meaningful error', () => {})
