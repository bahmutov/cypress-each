/// <reference types="cypress" />

// standard Node module "util" has "format" function
const { format } = require('util')

describe.each = (values) => {
  return function describeEach(titlePattern, testCallback) {
    // define a test for each value
    values.forEach((value) => {
      if (Array.isArray(value)) {
        const title = format(titlePattern, ...value)
        describe(title, testCallback.bind(null, ...value))
      } else {
        const title = format(titlePattern, value)
        describe(title, testCallback.bind(null, value))
      }
    })
  }
}

describe.each(['A', 1])('%s', (x) => {
  // we can use the values passed into the "describe" callback
  // because these are closure variables
  it(`checks out for ${x}`, () => {
    cy.wrap(x).should('equal', x)
  })
})
