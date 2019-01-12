import { SF2Chunk } from '~/chunk';
import { ParseError } from '~/riff';
import { SF_SAMPLE_HEADER_SIZE } from '~/constants';
import { SampleHeader } from '~/types';

/**
 * Get all sample headers from a `shdr` sub-chunk.
 *
 * @param {SF2Chunk} chunk - The input chunk
 */
export const getSampleHeaders = (chunk: SF2Chunk): SampleHeader[] => {
  if (chunk.id !== 'shdr') {
    throw new ParseError('Unexpected chunk ID', `'shdr'`, `'${chunk.id}'`);
  }

  if (chunk.length % SF_SAMPLE_HEADER_SIZE) {
    throw new ParseError(`Invalid size for the 'shdr' sub-chunk`);
  }

  return chunk.iterate<SampleHeader>(iterator => {
    return {
      name: iterator.getString(),
      start: iterator.getUInt32(),
      end: iterator.getUInt32(),
      startLoop: iterator.getUInt32(),
      endLoop: iterator.getUInt32(),
      sampleRate: iterator.getUInt32(),
      originalPitch: iterator.getByte(),
      pitchCorrection: iterator.getChar(),
      link: iterator.getInt16(),
      type: iterator.getInt16()
    };
  });
};
