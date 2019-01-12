import { RIFFChunk } from './riffChunk';
import { getStringFromBuffer } from '~/utils';

/**
 * A utility class to quickly iterate over a buffer.
 */
export class ChunkIterator<T = any> {
  public readonly target: T[] = [];
  private readonly chunk: RIFFChunk;
  private position: number = 0;

  public constructor(chunk: RIFFChunk, start: number = 0) {
    this.chunk = chunk;
    this.position = start;
  }

  /**
   * Get the position from the iterator.
   */
  public get currentPosition(): number {
    return this.position;
  }

  /**
   * Iterate over the chunk.
   *
   * @param {Function} callback - The callback that is called every iteration
   */
  public iterate(callback: (iterator: ChunkIterator<T>) => T | null) {
    while (this.position < this.chunk.length) {
      const object = callback(this);
      if (object) {
        this.target.push(object);
      }
    }
  }

  /**
   * Get a string from the buffer.
   *
   * @param {number} length - The length of the string. If no length is specified, a default of 20
   *   is assumed
   */
  public getString(length: number = 20): string {
    const text = getStringFromBuffer(this.getBuffer(this.position, length));
    this.position += length;
    return text;
  }

  /**
   * Get a signed 16-bit integer from the chunk.
   */
  public getInt16(): number {
    return this.chunk.buffer[this.position++] | (this.chunk.buffer[this.position++] << 8);
  }

  /**
   * Get a signed 16-bit integer from the chunk in the big-endian format.
   */
  public getInt16BE(): number {
    return (this.getInt16() << 16) >> 16;
  }

  /**
   * Get an unsigned 32-bit integer from the chunk.
   */
  public getUInt32(): number {
    return (
      (this.chunk.buffer[this.position++] |
        (this.chunk.buffer[this.position++] << 8) |
        (this.chunk.buffer[this.position++] << 16) |
        (this.chunk.buffer[this.position++] << 24)) >>>
      0
    );
  }

  /**
   * Get a single byte from the chunk.
   */
  public getByte(): number {
    return this.chunk.buffer[this.position++];
  }

  /**
   * Get a signed char from the chunk.
   */
  public getChar(): number {
    return (this.chunk.buffer[this.position++] << 24) >> 24;
  }

  /**
   * Skip ahead in the buffer.
   *
   * @param {number} length
   */
  public skip(length: number): void {
    this.position += length;
  }

  /**
   * Get a part of the buffer from start to start + length.
   *
   * @param {number} start
   * @param {number} length
   */
  private getBuffer(start: number, length: number): Uint8Array {
    return this.chunk.buffer.subarray(start, start + length);
  }
}
