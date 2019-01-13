import { ChunkIterator } from './chunkIterator';
import { getStringFromBuffer } from '~/utils';

export class RIFFChunk {
  /**
   * The chunk ID (fourCC).
   */
  public readonly id: string;

  /**
   * The length of the chunk.
   */
  public readonly length: number;

  /**
   * The raw buffer of the chunk.
   */
  public readonly buffer: Uint8Array;

  /**
   * The sub-chunks of the chunk. If the chunk is not a RIFF or LIST chunk, this will be an empty
   * array.
   */
  public readonly subChunks: RIFFChunk[];

  public constructor(id: string, length: number, buffer: Uint8Array, subChunks: RIFFChunk[]) {
    this.id = id;
    this.length = length;
    this.buffer = buffer;
    this.subChunks = subChunks;
  }

  /**
   * Get a string from the buffer. If no position and no length is specified, it returns the whole
   * buffer as a string.
   *
   * @param {number} [position]
   * @param {number} [length]
   */
  public getString(position: number = 0, length?: number): string {
    return getStringFromBuffer(this.getBuffer(position, length || this.length - position));
  }

  /**
   * Get a signed 16-bit integer from the buffer.
   *
   * @param {number} [position]
   */
  public getInt16(position: number = 0): number {
    return this.buffer[position++] | (this.buffer[position] << 8);
  }

  /**
   * Get an unsigned 32-bit integer from the buffer.
   *
   * @param {number} [position]
   */
  public getUInt32(position: number = 0): number {
    return (
      (this.buffer[position++] |
        (this.buffer[position++] << 8) |
        (this.buffer[position++] << 16) |
        (this.buffer[position] << 24)) >>>
      0
    );
  }

  /**
   * Get a byte from the buffer.
   *
   * @param {number} [position]
   */
  public getByte(position: number = 0): number {
    return this.buffer[position];
  }

  /**
   * Get a char from the buffer.
   *
   * @param {number} [position]
   */
  public getChar(position: number = 0): number {
    return (this.buffer[position] << 24) >> 24;
  }

  /**
   * Get a chunk iterator for the chunk.
   *
   * @param {number} [start] - The position where to start iterating. Defaults to 0.
   */
  public iterator<T = any>(start: number = 0): ChunkIterator<T> {
    return new ChunkIterator<T>(this, start);
  }

  /**
   * Utility function to quickly iterate over a function.
   *
   * @template T
   * @param {(iterator: ChunkIterator): T} callback - The callback that returns an instance of the
   *   specified return type
   * @param {number} [start] - The optional index where to start iterating over the chunk
   */
  public iterate<T = any>(callback: (iterator: ChunkIterator) => T | null, start: number = 0): T[] {
    const iterator = new ChunkIterator<T>(this, start);
    iterator.iterate(callback);
    return iterator.target;
  }

  /**
   * Get a buffer from `start` to `start` + `length`. The buffer is not copied (e.g. when using
   * .slice()), so any modifications to the buffer are done to the original buffer too.
   *
   * @param {number} start
   * @param {number} length
   */
  private getBuffer(start: number, length: number): Uint8Array {
    return this.buffer.subarray(start, start + length);
  }
}
