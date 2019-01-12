import { SF2Chunk } from '~/chunk';
import { Modulator } from '~/types';
import { ParseError } from '~/riff';
import { SF_MODULATOR_SIZE } from '~/constants';

/**
 * Get the modulators from either a `pmod` (presets) or `imod` (instruments) chunk.
 *
 * @param {SF2Chunk} chunk - The input chunk
 * @param {string} type - The type of chunk, either 'pmod' or 'imod'
 */
export const getModulators = (chunk: SF2Chunk, type: 'pmod' | 'imod'): Modulator[] => {
  if (chunk.id !== type) {
    throw new ParseError('Unexpected chunk ID', `'${type}'`, `'${chunk.id}'`);
  }

  if (chunk.length % SF_MODULATOR_SIZE) {
    throw new ParseError(`Invalid size for the '${type}' sub-chunk`);
  }

  return chunk.iterate<Modulator>(iterator => ({
    source: iterator.getInt16BE(),
    id: iterator.getInt16BE(),
    amount: iterator.getInt16BE(),
    amountSource: iterator.getInt16BE(),
    transform: iterator.getInt16BE()
  }));
};
