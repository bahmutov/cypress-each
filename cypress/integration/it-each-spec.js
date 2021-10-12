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
})
