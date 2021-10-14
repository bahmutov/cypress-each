// @ts-check
/// <reference types="cypress" />

// @ts-ignore
require('../..')
// @ts-ignore
const { formatTitle } = require('../../src/index.js')

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
