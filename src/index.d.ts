// types for it.each and describe.each
// any help improving them is welcome
// https://github.com/bahmutov/cypress-each
declare namespace Mocha {
  type TestCallback = (
    this: Context,
    arg0: unknown,
    arg1: unknown,
    arg2: unknown,
  ) => void

  interface TestFunction {
    each: (
      values: unknown[],
    ) => (titlePattern: string, fn: TestCallback) => void
  }

  interface SuiteFunction {
    each: (
      values: unknown[],
    ) => (titlePattern: string, fn: TestCallback) => void
  }
}
