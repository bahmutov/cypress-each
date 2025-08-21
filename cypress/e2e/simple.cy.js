// @ts-check
/// <reference types="cypress" />

import '../..'

describe('works', () => {
  it.each(['A', 1])('checks %s', (x) => {
    cy.wrap(x).should('equal', x)
  })
})
