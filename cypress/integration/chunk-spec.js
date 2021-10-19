// @ts-check
/// <reference types="cypress" />

import '../..'

describe('chunking items', () => {
  const items = [1, 2, 3, 4]

  // split all items across four machines
  // and this is the first machine, so it should only run the first item
  it.each(
    items,
    4,
    0,
  )('checks %d', (x) => {
    expect(x, 'the first item only').to.equal(1)
  })

  it.each(
    items,
    4,
    1,
  )('checks %d', (x) => {
    expect(x, 'the second item only').to.equal(2)
  })

  it.each(
    items,
    4,
    2,
  )('checks %d', (x) => {
    expect(x, 'the third item only').to.equal(3)
  })

  it.each(
    items,
    4,
    3,
  )('checks %d', (x) => {
    expect(x, 'the last item only').to.equal(4)
  })

  it.each(
    items,
    2, // split all items into 2 chunks
    0, // and this is chunk index 0
  )('checks %d', (x) => {
    expect(x, '1 or 2').to.be.oneOf([1, 2])
  })

  it.each(
    items,
    2, // split all items into 2 chunks
    1, // and this is chunk index 1
  )('checks %d', (x) => {
    expect(x, '3 or 4').to.be.oneOf([3, 4])
  })
})
