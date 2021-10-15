// types for it.each and describe.each
// any help improving them is welcome
// https://github.com/bahmutov/cypress-each
declare namespace Mocha {
  type TestCallback<T> = (this: Context, arg0: T, arg1: any, arg2: any) => void

  interface TestFunction {
    // definition for it.each
    each<T = unknown>(
      values: T[],
    ): (titlePattern: string, fn: TestCallback<T>) => void
  }

  interface SuiteFunction {
    // definition for describe.each
    each<T = unknown>(
      values: T[],
    ): (titlePattern: string, fn: TestCallback<T>) => void
  }
}