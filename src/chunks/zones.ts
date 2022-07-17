import { SF2Chunk } from '~/chunk';
import { ParseError } from '~/riff';
import { SF_BAG_SIZE } from '~/constants';
import {
  Generator,
  GeneratorType,
  Modulator,
  Zone,
  ZoneItems,
  ZoneItemsWithReference,
  ZoneMap
} from '~/types';

/**
 * Get the preset or instrument zones from a chunk.
 *
 * @param {SF2Chunk} chunk - The input chunk
 * @param {string} type - The type of chunk ('pbag' or 'ibag')
 */
export const getZones = (chunk: SF2Chunk, type: 'pbag' | 'ibag'): Zone[] => {
  if (chunk.id !== type) {
    throw new ParseError('Unexpected chunk ID', `'${type}'`, `'${chunk.id}'`);
  }

  if (chunk.length % SF_BAG_SIZE) {
    throw new ParseError(`Invalid size for the '${type}' sub-chunk`);
  }

  return chunk.iterate<Zone>(iterator => ({
    generatorIndex: iterator.getInt16(),
    modulatorIndex: iterator.getInt16()
  }));
};

/**
 * Get all modulators, generators and the instrument (for presets) or sample (for instruments) in a
 * preset or instrument.
 *
 * @template T
 * @template R
 * @param {T} headers - The preset or instrument headers
 * @param {Zone[]} zones - All zones for the preset or instrument
 * @param {Modulator[]} itemModulators - All modulators for the preset or instrument
 * @param {Generator[]} itemGenerators - All generators for the preset or instrument
 * @param {R[]} references - The instruments or samples to reference in the zone
 * @param {GeneratorType} referenceType - The generator type to reference it by
 */
export const getItemsInZone = <T extends { bagIndex: number }, R>(
  headers: T[],
  zones: Zone[],
  itemModulators: Modulator[],
  itemGenerators: Generator[],
  references: R[],
  referenceType: GeneratorType
): { header: T; zones: ZoneItemsWithReference<R>[]; globalZone?: ZoneItems }[] => {
  const items: { header: T; zones: ZoneItemsWithReference<R>[]; globalZone?: ZoneItems }[] = [];

  for (let i = 0; i < headers.length; i++) {
    const header = headers[i];
    const next = headers[i + 1];

    const start = header.bagIndex;
    const end = next ? next.bagIndex : zones.length;

    const zoneItems: ZoneItemsWithReference<R>[] = [];
    let globalZone;
    for (let j = start; j < end; j++) {
      const modulators = getModulators(j, zones, itemModulators);
      const generators = getGenerators(j, zones, itemGenerators);

      const keyRange =
        generators[GeneratorType.KeyRange] && generators[GeneratorType.KeyRange]!.range;
      const referenceId = generators[referenceType];
      if (!referenceId) {
        if (j - start === 0) {
          // first item without reference = global zone
          // Spec 7.3: If a preset has more than one zone, the first zone may be a global zone.
          // A global zone is determined by the fact that the last generator in the list is not an Instrument generator.
          // Spec 7.9: "Unless the zone is a global zone, the last generator in the list is a “sampleID” generator"
          globalZone = {
            keyRange,
            modulators,
            generators
          };
        }
        continue;
      }

      const reference = references[referenceId.value!];
      if (!reference) {
        continue;
      }

      zoneItems.push({
        keyRange,
        modulators,
        generators,
        reference
      });
    }

    items.push({
      header,
      globalZone,
      zones: zoneItems
    });
  }

  return items;
};

/**
 * Get all modulators from a zone, based on the index. The end index is the modulator index of the
 * next zone, or the total zone length if the current zone is the last one.
 *
 * @param {number} index - The index
 * @param {Zone[]} zones - ALl zones for the preset or instrument
 * @param {Modulator[]} modulators - All modulators for the preset or instrument
 */
const getModulators = (
  index: number,
  zones: Zone[],
  modulators: Modulator[]
): ZoneMap<Modulator> => {
  const zone = zones[index];
  const next = zones[index + 1];

  const start = zone.modulatorIndex;
  const end = next ? next.modulatorIndex : zones.length;

  return getZone(start, end, modulators);
};

/**
 * Get all generators from a zone, based on the index. The end index is the generators index of the
 * next zone, or the total zone length if the current zone is the last one.
 *
 * @param {number} index - The index
 * @param {Zone[]} zones - ALl zones for the preset or instrument
 * @param {Generator[]} generators - All generators for the preset or instrument
 */
const getGenerators = (
  index: number,
  zones: Zone[],
  generators: Generator[]
): ZoneMap<Generator> => {
  const zone = zones[index];
  const next = zones[index + 1];

  const start = zone.generatorIndex;
  const end = next ? next.generatorIndex : zones.length;

  return getZone(start, end, generators);
};

/**
 * Returns all modulators or generators as a key-value object, where the key is the `GeneratorType`
 * of the modulator or generator.
 *
 * @template T
 * @param {number} start - The start index
 * @param {number} end - The end index
 * @param {T[]} items - The modulators or generators
 */
const getZone = <T extends { id: GeneratorType }>(
  start: number,
  end: number,
  items: T[]
): { [key in GeneratorType]?: T } => {
  const itemsObject: ZoneMap<T> = {};

  for (let i = start; i < end; i++) {
    const item = items[i];
    if (item) {
      itemsObject[item.id] = item;
    }
  }

  return itemsObject;
};
