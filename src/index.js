/// <reference types="cypress" />

// standard Node module "util" has "format" function
const { format } = require('util')

if (!it.each) {
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
}

if (!describe.each) {
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
}
