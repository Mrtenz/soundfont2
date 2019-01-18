import { getChunk, getChunkId, getChunkLength, getSubChunks, parseBuffer } from '../../src/riff';
import buffer from './mocks/buffer';

describe('Parser', () => {
  it('should parse a chunk ID', () => {
    const chunkId = getChunkId(buffer);
    expect(chunkId).toBe('RIFF');
  });

  it('should parse a chunk length', () => {
    const chunkLength = getChunkLength(buffer, 4);
    expect(chunkLength).toBe(buffer.length - 4);
  });

  it('should parse a single chunk', () => {
    const chunk = getChunk(buffer, 12);
    expect(chunk.id).toBe('LIST');
  });

  it('should parse sub-chunks', () => {
    const subChunks = getSubChunks(buffer.subarray(12));
    expect(subChunks.length).toBe(1);
  });

  it('should parse a RIFF buffer and all sub-chunks', () => {
    const chunk = parseBuffer(buffer);
    expect(chunk.subChunks.length).toBe(1);

    const listChunk = chunk.subChunks[0];
    expect(listChunk.id).toBe('LIST');
    expect(listChunk.length).toBe(8);
    expect(listChunk.subChunks.length).toBe(1);

    const infoChunk = listChunk.subChunks[0];
    expect(infoChunk.id).toBe('INFO');
    expect(infoChunk.length).toBe(0);
    expect(infoChunk.subChunks.length).toBe(0);
  });
});
