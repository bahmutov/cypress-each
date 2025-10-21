// @ts-check
/// <reference types="cypress" />

import '../..'

describe('using it.only.each', () => {
  it.only.each([
    { name: 'Joe', age: 30 },
    { name: 'Mary', age: 20 },
  ])('has correct types', (user) => {
    expect(user).to.have.keys('name', 'age')
    expect(user.name).to.be.a('string')
    expect(user.age).to.be.a('number')
  })

  it('capital letter A !== a', () => {
    cy.wrap('A').should('not.equal', 'a')
  })
})
