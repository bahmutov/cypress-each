# cypress-each ![cypress version](https://img.shields.io/badge/cypress-9.4.1-brightgreen) [![renovate-app badge][renovate-badge]][renovate-app] [![ci](https://github.com/bahmutov/cypress-each/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/bahmutov/cypress-each/actions/workflows/ci.yml)
> A demo of mocha-each and custom describe.each and it.each implementation for Cypress

## Blog posts

- [Dynamic API Tests Using Cypress-Each Plugin](https://glebbahmutov.com/blog/dynamic-api-tests-using-cypress-each/)
- [Refactor Tests To Be Independent And Fast Using Cypress-Each Plugin](https://glebbahmutov.com/blog/refactor-using-each/)
- [Test your sitemap using Cypress](https://glebbahmutov.com/blog/test-sitemap/)

## Videos

- [Using cypress-each To Create Separate Tests](https://youtu.be/utPKRV_fL1E)
- [Test Each URL From Sitemap In Its Own Separate Cypress Test](https://youtu.be/qkofPocd7lY)
- [Using Faker to generate test data and execute separate tests using cypress-each plugin](https://youtu.be/WO3ujoEhVUc)

## Install and use

```
# install using NPM
$ npm i -D cypress-each
# install using Yarn
# yarn add -D cypress-each
```

Import `cypress-each` in a single spec or in Cypress support file

```js
import 'cypress-each'
// now can use describe.each and it.each
```

Let's create a separate test for each selector from a list

```js
import 'cypress-each'

// create a separate test for each selector
const selectors = ['header', 'footer', '.new-todo']
it.each(selectors)('element %s is visible', (selector) => {
  cy.visit('/')
  cy.get(selector).should('be.visible')
})
// creates tests
// "element header is visible"
// "element footer is visible"
// "element .new-todo is visible"
```

## Multiple arguments

You can pass multiple arguments into the callback function by using an array of arrays. For example, to check if an element is visible, invisible, or exists, you can have both a selector and the assertion string for each item.

```js
const data = [
  // each entry is an array [selector, assertion]
  ['header', 'be.visible'],
  ['footer', 'exist']
  ['.new-todo', 'not.be.visible']
]
it.each(data)('element %s should %s', (selector, assertion) => {
  cy.visit('/')
  cy.get(selector).should(assertion)
})
// creates tests
// "element header should be.visible"
// "element footer should exist"
// "element .new-todo should not.be.visible"
```

## Repeat the test N times

You can use this module to simply repeat the test N times

```js
// repeat the same test 5 times
it.each(5)('test %K of 5', function (k) {
  // note the iteration index k is passed to each test
  expect(k).to.be.within(0, 4)
})

// you can repeat the suite of tests
describe.each(3)('suite %K of 3', function (k) {
  ...
})
```

See the [repeat-spec.js](./cypress/integration/repeat-spec.js)

## Test and suite titles

You can use the arguments to the test callback in the test title in order.

```js
it.each([10, 20, 30])('number is %d', (x) => { ... })
// creates the tests
// "number is 10"
// "number is 20"
// "number is 30"
```

If you want to use the iteration variable in the title, use `%k` for zero-based index, or `%K` for one-based index.

```js
it.each([10, 20, 30])('checking item %k', (x) => { ... })
// creates the tests
// "checking item 0"
// "checking item 1"
// "checking item 2"
it.each([10, 20, 30])('checking item %K', (x) => { ... })
// creates the tests
// "checking item 1"
// "checking item 2"
// "checking item 3"
```

You can use `%N` to insert the total number of items

```js
it.each(['first', 'second'])('test %K of %N', (x) => { ... })
// creates the tests
// "test 1 of 2"
// "test 2 of 2"
```

### Title function

You can form the test title yourself using a function. The function will get the item, the index, and all items and should return a string with the test title.

```js
function makeTestTitle(s, k, strings) {
  return `test ${k + 1} for "${s}"`
}
it.each(['first', 'second'])(makeTestTitle, () => ...)
// creates the tests
// 'test 1 for "first"'
// 'test 2 for "second"'
```

It is very useful for forming a test title based on a property of an object, like

```js
it.each([
  { name: 'Joe', age: 30 },
  { name: 'Mary', age: 20 },
])(
  (person) => `tests person ${person.name}`,
  (person) => { ... }
})
// creates the tests
// "tests person Joe"
// "tests person Mary"
```

See [cypress/integration/title-function.js](./cypress/integration/ title-function.js) for more examples

## Every Nth item

You can quickly take every Nth item from an array

```js
it.each(items, N)(...)
```

This is the same as taking the index of the item (zero-based) and doing `k % N === 0`

```js
const items = [1, 2, 3, 4, 5, 6, ...]
it.each(items, 3)(...)
// tests item 1, 4, 7, ...
```

## Chunking

There is a built-in chunking helper in `describe.each` and `it.each` to only take a subset of the items. For example, to split all items into 3 chunks, and take the middle one, use

```js
it.each(items, 3, 1)(...)
```

The other spec files can take the other chunks. The index starts at 0, and should be less than the number of chunks.

```js
// split all items among 3 specs
// spec-a.js
it.each(items, 3, 0)(...)
// spec-b.js
it.each(items, 3, 1)(...)
// spec-c.js
it.each(items, 3, 2)(...)
```

## Sampling

Cypress bundles [Lodash](https://lodash.com/) library which includes `_.sampleSize` method that you can use to randomly pick N items when passing the list to `it.each`

```js
// pick 2 random items from the array and create 2 tests
it.each(Cypress._.sampleSize(items, 2))(...)
```

## Custom filter predicate

You can filter the items by passing a predicate function

```js
it.each(items, (x, k) => ...)
// creates a test for every item the predicate returns a truthy value
```

## Return value

`it.each(...)(...)` and `describe.each(...)(...)` return the number of created tests.

```js
const n = it.each([1, 2])(...)
// n is 2
```

## Exclusive tests

Normally you could run just a selected test using `it.only` or a suite of tests using `describe.only`. Similarly, you could skip a single test or a suite of tests using `it.skip` and `describe.skip` methods. These methods are NOT supported by `it.each` and `describe.each`. Thus if you want to only run the `it.each` tests, surround it with its own `describe` block.

```js
// only run the generated tests
describe.only('my tests', () => {
  it.each(items)(...)
})
// skip these tests
describe.skip('obsolete generated tests', () => {
  it.each(items)(...)
})
// run just these suites of generated tests
describe.only('my suites of tests', () => {
  describe.each(items)(...)
})
```

## Test configuration object

Cypress allows to pass some of its configuration options in the `it` and `describe` arguments, see [the configuration](https://on.cypress.io/configuration) page. These methods `it.each` and `describe.each` do not support this, but you can create a wrapper `describe` block and set the options there, if needed.

```js
// if a test inside this suite fails,
// retry it up to two times before failing it
describe('user', { retries: 2 }, () => {
  it.each(users)(...)
})
```

## Specs

Find the implementation in [src/index.js](./src/index.js)

- [it-spec.js](./cypress/integration/it-spec.js) uses no shortcuts to define multiple tests that are almost the same. We want to avoid the repetition
- [it-each-spec.js](./cypress/integration/it-each-spec.js) uses the `it.each` helper to generate multiple `it` tests given a data array
- [describe-each-spec.js](./cypress/integration/describe-each-spec.js) uses `describe.each` helper to create `describe` blocks for each item in the given data array
- [mocha-each-spec.js](cypress/integration/mocha-each-spec.js) uses 3rd party [mocha-each](https://github.com/ryym/mocha-each) to generate `it` tests for each data item

## Types

This package includes TypeScript definition for `it.each` and `describe.each`. Thus the parameter should be the right type from the array of values:

```js
it.each([
  { name: 'Joe', age: 30 },
  { name: 'Mary', age: 20 },
])('has correct types', (user) => {
  // the type for the "user" should be
  // name: string, age: number
  expect(user).to.have.keys('name', 'age')
  expect(user.name).to.be.a('string')
  expect(user.age).to.be.a('number')
})
```

Include this module with other library types, like

```json
{
  "compilerOptions": {
    "types": ["cypress", "cypress-each"],
  }
}
```

Or inside an individual spec file add

```js
/// <reference types="cypress-each" />
```

## Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2021

- [@bahmutov](https://twitter.com/bahmutov)
- [glebbahmutov.com](https://glebbahmutov.com)
- [blog](https://glebbahmutov.com/blog)
- [videos](https://www.youtube.com/glebbahmutov)
- [presentations](https://slides.com/bahmutov)
- [cypress.tips](https://cypress.tips)

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/cypress-each/issues) on Github

## MIT License

Copyright (c) 2021 Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt;

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
