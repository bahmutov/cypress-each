/// <reference types="cypress" />

// standard Node module "util" has "format" function
const { format } = require('util')

function formatTitle(pattern, ...values) {
  // count how many format placeholders are in the pattern
  // by counting the "%" characters
  const placeholders = pattern.match(/%/g)
  const count = placeholders ? placeholders.length : 0
  return format.apply(null, [pattern].concat(values.slice(0, count)))
}

if (!it.each) {
  it.each = function (values) {
    return function (titlePattern, testCallback) {
      values.forEach(function (value, k) {
        const testTitle = titlePattern.replace('%k', k).replace('%K', k + 1)

        // define a test for each value
        if (Array.isArray(value)) {
          const title = formatTitle(testTitle, ...value)
          it(title, function itArrayCallback() {
            return testCallback.apply(this, value)
          })
        } else {
          const title = formatTitle(testTitle, value)
          it(title, function itCallback() {
            return testCallback.call(this, value)
          })
        }
      }, this)
    }
  }
}

if (!describe.each) {
  describe.each = function (values) {
    return function describeEach(titlePattern, testCallback) {
      // define a test for each value
      values.forEach((value, k) => {
        const testTitle = titlePattern.replace('%k', k).replace('%K', k + 1)

        if (Array.isArray(value)) {
          const title = formatTitle(testTitle, ...value)
          describe(title, testCallback.bind(null, ...value))
        } else {
          const title = formatTitle(testTitle, value)
          describe(title, testCallback.bind(null, value))
        }
      })
    }
  }
}

module.exports = { formatTitle }
