// types for it.each and describe.each
// any help improving them is welcome
// https://github.com/bahmutov/cypress-each

type TestTitleFn<T> = (item: T, index: number, items: T[]) => string

declare namespace Mocha {  
  type TestCallback<T extends readonly any[]> =
    T extends [] ? (this:Contexte,arg1:any,arg2:any) => void : 
    Parameters<(...res: [...T, ?any, ?any]) => void> extends [...infer R] ?
    R extends readonly [...T, ?any, ?any] ?
    (this:Contexte,...res: [...R]) => void : never : never

  interface TestFunction {
    /**
     * Iterates over each given item (optionally chunked), and creates
     * a separate test for each one.
     * @param values Input items to create the tests form
     * @param totalChunks (Optional) number of chunks to split the items into
     * @param chunkIndex (Optional) index of the chunk to get items from
     * @example it.each([1, 2, 3])('test %K', (x) => ...)
     * @see https://github.com/bahmutov/cypress-each
     */
    each<T extends readonly [...T]>(
      values:  Array<readonly [...T]>,
      totalChunks?: number,
      chunkIndex?: number,
    ): (titlePattern: string | TestTitleFn<[...T]>, fn: TestCallback<[...T]>) => void
    each<T = unknown>(
      values: T[],
      totalChunks?: number,
      chunkIndex?: number,
    ): (titlePattern: string | TestTitleFn<T>, fn: TestCallback<[T]>) => void  
  }
  
  interface SuiteFunction {
    /**
     * Iterates over each given item (optionally chunked), and creates
     * a separate suite for each one.
     * @param values Input items to create the tests form
     * @param totalChunks (Optional) number of chunks to split the items into
     * @param chunkIndex (Optional) index of the chunk to get items from
     * @example describe.each([1, 2, 3])('suite %K', (item) => ...)
     * @see https://github.com/bahmutov/cypress-each
     */
    each<T = unknown>(
      values: T[],
      totalChunks?: number,
      chunkIndex?: number,
    ): (titlePattern: string | TestTitleFn<T>, fn: TestCallback<T>) => void
  }
}
