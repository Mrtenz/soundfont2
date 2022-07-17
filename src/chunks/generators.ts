import { SF2Chunk } from '~/chunk';
import { ParseError } from '~/riff';
import { Generator, GeneratorType } from '~/types';
import { SF_GENERATOR_SIZE } from '~/constants';

/**
 * An array of GeneratorTypes that cannot be specified for presets. If one of these generator types
 * is found, the generator should be ignored.
 */
const PRESET_TYPES_BLACKLIST: number[] = [
  GeneratorType.StartAddrsOffset,
  GeneratorType.EndAddrsOffset,
  GeneratorType.StartLoopAddrsOffset,
  GeneratorType.EndLoopAddrsOffset,
  GeneratorType.StartAddrsCoarseOffset,
  GeneratorType.EndAddrsCoarseOffset,
  GeneratorType.StartLoopAddrsCoarseOffset,
  GeneratorType.KeyNum,
  GeneratorType.Velocity,
  GeneratorType.EndLoopAddrsCoarseOffset,
  GeneratorType.SampleModes,
  GeneratorType.ExclusiveClass,
  GeneratorType.OverridingRootKey
];

/**
 * An array of GeneratorTypes that cannot be specified for instruments. If one of these generator
 * types is found, the generator should be ignored.
 */
const INSTRUMENT_TYPES_BLACKLIST: number[] = [
  GeneratorType.Unused1,
  GeneratorType.Unused2,
  GeneratorType.Unused3,
  GeneratorType.Unused4,
  GeneratorType.Reserved1,
  GeneratorType.Reserved2,
  GeneratorType.Reserved3
];

/**
 * These GeneratorTypes specify a range of key numbers or velocity.
 */
const RANGE_TYPES: number[] = [GeneratorType.KeyRange, GeneratorType.VelRange];

/**
 * Get all generators for either an preset generator chunk or a instrument generator chunk.
 *
 * TODO: Check if generator chunk is valid, by following the rules defined in the spec. See for
 * example: https://github.com/FluidSynth/fluidsynth/blob/v2.0.3/src/sfloader/fluid_sffile.c
 *
 * @param {SF2Chunk} chunk - The input chunk
 * @param {string} type - The type, can be 'pgen' or 'igen'
 */
export const getGenerators = (chunk: SF2Chunk, type: 'pgen' | 'igen'): Generator[] => {
  if (chunk.id !== type) {
    throw new ParseError('Unexpected chunk ID', `'${type}'`, `'${chunk.id}'`);
  }

  if (chunk.length % SF_GENERATOR_SIZE) {
    throw new ParseError(`Invalid size for the '${type}' sub-chunk`);
  }

  return chunk.iterate<Generator>(iterator => {
    const id = iterator.getInt16();

    // Ignore invalid IDs
    if (!GeneratorType[id]) {
      return null;
    }

    if (type === 'pgen' && PRESET_TYPES_BLACKLIST.includes(id)) {
      return null;
    }

    if (type === 'igen' && INSTRUMENT_TYPES_BLACKLIST.includes(id)) {
      return null;
    }

    if (RANGE_TYPES.includes(id)) {
      return {
        id,
        range: {
          lo: iterator.getByte(),
          hi: iterator.getByte()
        }
      };
    }

    return {
      id,
      value: iterator.getInt16BE()
    };
  });
};
