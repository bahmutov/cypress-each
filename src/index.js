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

function getChunk(values, totalChunks, chunkIndex) {
  // split all items into N chunks and take just a single chunk
  if (totalChunks < 0) {
    throw new Error('totalChunks must be >= 0')
  }

  if (chunkIndex < 0 || chunkIndex >= totalChunks) {
    throw new Error(
      `Invalid chunk index ${chunkIndex} vs all chunks ${totalChunks}`,
    )
  }

  const chunkSize = Math.ceil(values.length / totalChunks)
  const chunkStart = chunkIndex * chunkSize
  const chunkEnd = chunkStart + chunkSize
  const chunk = values.slice(chunkStart, chunkEnd)
  return chunk
}

function makeTitle(titlePattern, value, k, values) {
  if (typeof titlePattern === 'string') {
    const testTitle = titlePattern
      .replace('%k', k)
      .replace('%K', k + 1)
      .replace('%N', values.length)
    if (Array.isArray(value)) {
      return formatTitle(testTitle, ...value)
    } else {
      return formatTitle(testTitle, value)
    }
  } else if (typeof titlePattern === 'function') {
    return titlePattern(value, k, values)
  }

  throw new Error('titlePattern must be a string or function')
}

if (!it.each) {
  it.each = function (values, totalChunks, chunkIndex) {
    if (typeof values === 'number') {
      // the user wants to repeat the same test N times
      if (values < 1) {
        throw new Error('Number of test repetitions must be >= 1')
      }
      values = Cypress._.range(0, values)
    }

    if (!Array.isArray(values)) {
      throw new Error('cypress-each: values must be an array')
    }

    return function (titlePattern, testCallback) {
      if (typeof totalChunks === 'number' && typeof chunkIndex === 'number') {
        // split all items into N chunks and take just a single chunk
        values = getChunk(values, totalChunks, chunkIndex)
      } else if (
        typeof totalChunks === 'number' &&
        typeof chunkIndex === 'undefined'
      ) {
        // take every Nth item
        values = values.filter((_, k) => k % totalChunks === 0)
      } else if (typeof totalChunks === 'function') {
        // filter using the given predicate
        values = values.filter(totalChunks)
      }

      values.forEach(function (value, k) {
        const title = makeTitle(titlePattern, value, k, values)
        if (!title) {
          throw new Error(
            `Could not compute the test title ${k} for value ${value}`,
          )
        }

        // define a test for each value
        if (Array.isArray(value)) {
          // const title = formatTitle(testTitle, ...value)
          it(title, function itArrayCallback() {
            return testCallback.apply(this, value)
          })
        } else {
          // const title = formatTitle(testTitle, value)
          it(title, function itCallback() {
            return testCallback.call(this, value)
          })
        }
      }, this)

      // returns the number of created tests
      return values.length
    }
  }
}

if (!describe.each) {
  context.each = describe.each = function (values) {
    if (typeof values === 'number') {
      // the user wants to repeat the same suite N times
      if (values < 1) {
        throw new Error('Number of suite repetitions must be >= 1')
      }
      values = Cypress._.range(0, values)
    }

    if (!Array.isArray(values)) {
      throw new Error('cypress-each: values must be an array')
    }

    if (typeof totalChunks === 'number' && typeof chunkIndex === 'number') {
      // split all items into N chunks and take just a single chunk
      values = getChunk(values, totalChunks, chunkIndex)
    }

    return function describeEach(titlePattern, testCallback) {
      // define a test for each value
      values.forEach((value, k) => {
        const title = makeTitle(titlePattern, value, k, values)

        if (!title) {
          throw new Error(
            `Could not compute the suite title ${k} for value ${value}`,
          )
        }

        if (Array.isArray(value)) {
          // const title = formatTitle(testTitle, ...value)
          describe(title, testCallback.bind(null, ...value))
        } else {
          // const title = formatTitle(testTitle, value)
          describe(title, testCallback.bind(null, value))
        }
      })

      // returns the number of created suites
      return values.length
    }
  }
}

module.exports = { formatTitle, makeTitle, getChunk }
