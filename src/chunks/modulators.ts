import { SF2Chunk } from '~/chunk';
import { Modulator, ControllerValue } from '~/types';
import { ParseError } from '~/riff';
import { SF_MODULATOR_SIZE } from '~/constants';

/**
 * Get the modulator enumerator value from a 16-bit integer.
 *
 * @param {number} value - The 16-bit integer
 */
const getModulatorValue = (value: number): ControllerValue => {
  return {
    type: (value >> 10) & 0x3f,
    polarity: (value >> 9) & 1,
    direction: (value >> 8) & 1,
    palette: (value >> 7) & 1,
    index: value & 0x7f
  };
};

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

  return chunk.iterate<Modulator>(iterator => {
    return {
      source: getModulatorValue(iterator.getInt16BE()),
      id: iterator.getInt16BE(),
      value: iterator.getInt16BE(),
      valueSource: getModulatorValue(iterator.getInt16BE()),
      transform: iterator.getInt16BE()
    };
  });
};
