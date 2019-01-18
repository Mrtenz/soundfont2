import buffer from './mocks/buffer';
import { ChunkIterator, parseBuffer } from '../../src/riff';

const chunk = parseBuffer(buffer);

describe('RIFFChunk', () => {
  it('should parse a string', () => {
    expect(chunk.getString(0, 4)).toBe('sfbk');
    expect(chunk.getString(4, 4)).toBe('LIST');
  });

  it('should parse a number', () => {
    expect(chunk.getInt16(8)).toBe(8);
    expect(chunk.getUInt32(8)).toBe(8);
  });

  it('should parse a byte', () => {
    expect(chunk.getByte(0)).toBe(0x73);
  });

  it('should parse a char', () => {
    expect(chunk.getChar(0)).toBe(0x73);
  });

  it('should iterate over the chunk', () => {
    const callback = jest.fn((iterator: ChunkIterator<any>) => {
      iterator.skip(1);
    });

    chunk.iterate(callback);
    expect(callback.mock.calls.length).toBe(buffer.length - 8);

    callback.mockClear();
    chunk.iterate(callback, 10);
    expect(callback.mock.calls.length).toBe(buffer.length - 18);
  });
});
