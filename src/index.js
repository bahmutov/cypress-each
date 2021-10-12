/// <reference types="cypress" />

// standard Node module "util" has "format" function
const { format } = require('util')

function formatTitle(pattern, ...values) {
  // count how many format placeholders are in the pattern
  // by counting the "%" characters
  const count = pattern.match(/%/g).length
  return format.apply(null, [pattern].concat(values.slice(0, count)))
}

if (!it.each) {
  it.each = (values) => {
    return function (titlePattern, testCallback) {
      values.forEach((value) => {
        // define a test for each value
        if (Array.isArray(value)) {
          const title = formatTitle(titlePattern, ...value)
          it(title, testCallback.bind(null, ...value))
        } else {
          const title = formatTitle(titlePattern, value)
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
          const title = formatTitle(titlePattern, ...value)
          describe(title, testCallback.bind(null, ...value))
        } else {
          const title = formatTitle(titlePattern, value)
          describe(title, testCallback.bind(null, value))
        }
      })
    }
  }
}
