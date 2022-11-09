// @ts-check
/// <reference types="cypress" />

// @ts-ignore
require('../..')
// @ts-ignore
const { formatTitle, makeTitle } = require('../../src/index.js')

describe('formatted title', () => {
  // each value will be automatically inserted into the formatted test title
  it.each([10, 20, 30])('case %K: an item costs $%d.00 on sale', function (x) {
    expect(x, 'item cost').to.be.oneOf([10, 20, 30])
    if (this.test) {
      expect(this.test.title).to.be.oneOf([
        'case 1: an item costs $10.00 on sale',
        'case 2: an item costs $20.00 on sale',
        'case 3: an item costs $30.00 on sale',
      ])
    }
  })
})

describe('format', () => {
  const person = {
    name: 'Joe',
  }

  it('formats title using %d', () => {
    expect(formatTitle('one is %d', 1)).to.equal('one is 1')
  })

  // it should only use the number of arguments
  // in the string format, and not all available arguments
  it.each([['person', person, 42]])('I am a %s', (name, who, life) => {
    expect(name).to.equal('person')
    expect(who).to.equal(person)
    expect(life).to.equal(42)
  })

  it.each([['person', 42, person]])('I am a %s at %d', (name, life, who) => {
    expect(name).to.equal('person')
    expect(who).to.equal(person)
    expect(life).to.equal(42)
  })

  it.each([['person', 42, person]])(
    'I use no format placeholders',
    (name, life, who) => {
      expect(name).to.equal('person')
      expect(who).to.equal(person)
      expect(life).to.equal(42)
    },
  )
})

describe('makeTitle', () => {
  const values = [1, 2, 3]

  it('makes title using %K', () => {
    expect(makeTitle('one is %K', 1, 0, values)).to.equal('one is 1')
  })

  it('makes title using %k and value', () => {
    expect(makeTitle('at index %k is value %d', 42, 0, values)).to.equal(
      'at index 0 is value 42',
    )
  })

  it('makes title using number of values', () => {
    expect(makeTitle('value %d is %K of %N', 42, 0, values)).to.equal(
      'value 42 is 1 of 3',
    )
  })
})
