import { SF2Chunk } from '~/chunk';
import { ParseError } from '~/riff';
import { SF_PRESET_HEADER_SIZE } from '~/constants';
import { PresetHeader } from '~/types';

/**
 * Get all preset headers from a `phdr` sub-chunk.
 *
 * @param {SF2Chunk} chunk - The input chunk
 */
export const getPresetHeaders = (chunk: SF2Chunk): PresetHeader[] => {
  if (chunk.id !== 'phdr') {
    throw new ParseError('Invalid chunk ID', `'phdr'`, `'${chunk.id}'`);
  }

  if (chunk.length % SF_PRESET_HEADER_SIZE) {
    throw new ParseError(`Invalid size for the 'phdr' sub-chunk`);
  }

  return chunk.iterate<PresetHeader>(iterator => {
    return {
      name: iterator.getString(),
      preset: iterator.getInt16(),
      bank: iterator.getInt16(),
      bagIndex: iterator.getInt16(),
      library: iterator.getUInt32(),
      genre: iterator.getUInt32(),
      morphology: iterator.getUInt32()
    };
  });
};
