// @ts-check
/// <reference types="cypress" />

describe('has expected values', () => {
  it('A = A', () => {
    cy.wrap('A').should('equal', 'A')
  })

  it('1 = 1', () => {
    cy.wrap(1).should('equal', 1)
  })

  it('capital letter A !== a', () => {
    cy.wrap('A').should('not.equal', 'a')
  })
})
