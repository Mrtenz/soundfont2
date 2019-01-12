import { SF2Chunk } from '~/chunk';
import { ParseError } from '~/riff';
import { SF_INSTRUMENT_HEADER_SIZE } from '~/constants';
import { InstrumentHeader } from '~/types';

/**
 * Get all instrument headers from a `inst` sub-chunk.
 *
 * @param {SF2Chunk} chunk - The input chunk
 */
export const getInstrumentHeaders = (chunk: SF2Chunk): InstrumentHeader[] => {
  if (chunk.id !== 'inst') {
    throw new ParseError('Unexpected chunk ID', `'inst'`, `'${chunk.id}'`);
  }

  if (chunk.length % SF_INSTRUMENT_HEADER_SIZE) {
    throw new ParseError(`Invalid size for the 'inst' sub-chunk`);
  }

  return chunk.iterate<InstrumentHeader>(iterator => {
    return {
      name: iterator.getString(),
      bagIndex: iterator.getInt16()
    };
  });
};
