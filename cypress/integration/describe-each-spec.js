// @ts-check
/// <reference types="cypress" />

import '../..'

describe.each(['A', 1])('%s', (x) => {
  // we can use the values passed into the "describe" callback
  // because these are closure variables
  it(`checks out for ${x}`, () => {
    cy.wrap(x).should('equal', x)
  })
})
