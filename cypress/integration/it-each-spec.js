/// <reference types="cypress" />

// standard Node module "util" has "format" function
const { format } = require('util')

it.each = (values) => {
  return function (titlePattern, testCallback) {
    values.forEach((value) => {
      // define a test for each value
      if (Array.isArray(value)) {
        const title = format(titlePattern, ...value)
        it(title, testCallback.bind(null, ...value))
      } else {
        const title = format(titlePattern, value)
        it(title, testCallback.bind(null, value))
      }
    })
  }
}

describe('using it.each', () => {
  it.each(['A', 1])('checks %s', (x) => {
    cy.wrap(x).should('equal', x)
  })

  it.each([['A', 'a']])('capital letter %s !== %s', (X, x) => {
    cy.wrap(X).should('not.equal', x)
  })
})
