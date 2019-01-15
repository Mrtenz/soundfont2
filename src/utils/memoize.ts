/**
 * Returns a memoized function for the original function. Function arguments are serialized as a
 * JSON string and stored in an in-memory object.
 *
 * @template T
 * @template U
 * @param {(...originalArgs: T[]) => U} originalFunction
 */
export const memoize = <T, U>(
  originalFunction: (...originalArgs: T[]) => U
): ((...args: T[]) => U) => {
  const memo: { [key: string]: U } = {};

  return (...args: T[]) => {
    const serializedArgs = JSON.stringify(args);
    if (serializedArgs in memo) {
      return memo[serializedArgs];
    }

    const output = originalFunction(...args);
    memo[serializedArgs] = output;
    return output;
  };
};
