/**
 * Convert a UTF-8 encoded buffer into a string. This will read the full buffer as UTF-8 encoded
 * string and return anything before the first NULL character. The output text is trimmed of any
 * preceding or following spaces.
 *
 * @param {Buffer} buffer - The input buffer
 */
export const getStringFromBuffer = (buffer: Uint8Array): string => {
  const decoded = new TextDecoder('utf8').decode(buffer);
  const nullIndex = decoded.indexOf('\0');
  return (nullIndex === -1 ? decoded : decoded.slice(0, nullIndex)).trim();
};
