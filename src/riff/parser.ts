import { ParseError } from './parseError';
import { getStringFromBuffer } from '~/utils/buffer';
import { RIFFChunk } from './riffChunk';

/**
 * Attempts to parse a RIFF file from a raw buffer.
 *
 * @param {Uint8Array} buffer - The input buffer
 */
export const parseBuffer = (buffer: Uint8Array): RIFFChunk => {
  const id = getChunkId(buffer);
  if (id !== 'RIFF') {
    throw new ParseError('Invalid file format', 'RIFF', id);
  }

  const signature = getChunkId(buffer, 8);
  if (signature !== 'sfbk') {
    throw new ParseError('Invalid signature', 'sfbk', signature);
  }

  const newBuffer = buffer.subarray(8);
  const subChunks = getSubChunks(newBuffer.subarray(4));
  return new RIFFChunk(id, newBuffer.length, newBuffer, subChunks);
};

/**
 * Get a RIFF chunk from a buffer.
 *
 * @param {Buffer} buffer - The input buffer
 * @param {number} start - Where to start reading the buffer
 */
export const getChunk = (buffer: Uint8Array, start: number): RIFFChunk => {
  const id = getChunkId(buffer, start);
  const length = getChunkLength(buffer, start + 4);

  // RIFF and LIST chunks can have sub-chunks
  let subChunks: RIFFChunk[] = [];
  if (id === 'RIFF' || id === 'LIST') {
    subChunks = getSubChunks(buffer.subarray(start + 12));
  }

  return new RIFFChunk(id, length, buffer.subarray(start + 8), subChunks);
};

/**
 * Get the length of a chunk, based on the RIFF length specifier.
 *
 * @param {Buffer} buffer - The input buffer
 * @param {number} start - Where to start reading the buffer for the length
 */
export const getChunkLength = (buffer: Uint8Array, start: number) => {
  buffer = buffer.subarray(start, start + 4);

  return (buffer[0] | (buffer[1] << 8) | (buffer[2] << 16) | (buffer[3] << 24)) >>> 0;
};

/**
 * Get all sub-chunks in a buffer. This will read until the end of the buffer and return any
 * sub-chunks found in it.
 *
 * @param {Buffer} buffer - The input buffer
 */
export const getSubChunks = (buffer: Uint8Array): RIFFChunk[] => {
  const chunks: RIFFChunk[] = [];
  let index = 0;

  while (index <= buffer.length - 8) {
    const subChunk = getChunk(buffer, index);
    chunks.push(subChunk);

    index += 8 + subChunk.length;
    index = index % 2 ? index + 1 : index;
  }

  return chunks;
};

/**
 * Get the chunk ID (fourCC) from the buffer. This assumes the fourCC code is formatted as an UTF-8
 * string.
 *
 * @param {Buffer} buffer - The input buffer
 * @param {number} start - Where to start reading the chunk ID from the buffer
 */
export const getChunkId = (buffer: Uint8Array, start: number = 0) => {
  return getStringFromBuffer(buffer.subarray(start, start + 4));
};
