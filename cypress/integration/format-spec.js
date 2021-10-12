/// <reference types="cypress" />

import '../..'

describe('format', () => {
  const person = {
    name: 'Joe',
  }

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
})
