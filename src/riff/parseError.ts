/**
 * Error class used for all errors encountered during the parsing of the SoundFont 2 file.
 */
export class ParseError extends Error {
  public constructor(message: string);
  public constructor(message: string, expected: string, received: string);
  public constructor(message: string, expected?: string, received?: string) {
    super(
      `${message}${expected && received ? `, expected ${expected}, received ${received}` : ``}`
    );
  }
}
