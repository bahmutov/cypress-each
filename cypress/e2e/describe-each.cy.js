// @ts-check
/// <reference types="cypress" />

import '../..'

const n = describe.each(['A', 1])('%s', (x) => {
  before(() => {
    expect(n, 'number of created suites').to.equal(2)
  })
  // we can use the values passed into the "describe" callback
  // because these are closure variables
  it(`checks out for ${x}`, () => {
    cy.wrap(x).should('equal', x)
  })
})

describe.each([
  { name: 'Joe', age: 30 },
  { name: 'Mary', age: 20 },
])('has correct types', (user) => {
  it('checks out', () => {
    expect(user).to.have.keys('name', 'age')
    expect(user.name).to.be.a('string')
    expect(user.age).to.be.a('number')
  })
})
