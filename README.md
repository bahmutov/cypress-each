# cypress-each
> An demo of mocha-each and custom describe.each and it.each implementation for Cypress

Find the implementation in [src/index.js](./src/index.js)

## Specs

- [it-spec.js](./cypress/integration/it-spec.js) uses no shortcuts to define multiple tests that are almost the same. We want to avoid the repetition
- [it-each-spec.js](./cypress/integration/it-each-spec.js) uses the `it.each` helper to generate multiple `it` tests given a data array
- [describe-each-spec.js](./cypress/integration/describe-each-spec.js) uses `describe.each` helper to create `describe` blocks for each item in the given data array
- [mocha-each-spec.js](cypress/integration/mocha-each-spec.js) uses 3rd party [mocha-each](https://github.com/ryym/mocha-each) to generate `it` tests for each data item
