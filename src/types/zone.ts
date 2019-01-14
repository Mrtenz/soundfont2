import { Modulator } from './modulator';
import { Generator, GeneratorType, Range } from './generator';

/**
 * Describes the generator and modulator index for a preset or instrument zone, defined to play
 * over certain key numbers and velocities.
 *
 * If a preset or instrument has more than one zone, the first zone may be a global zone. A global
 * zone is determined by the fact that the last generator in the list is not an instrument
 * generator.
 */
export interface Zone {
  /**
   * The index of the preset's or instrument's list of generators in the PGEN or IGEN sub-chunk.
   */
  generatorIndex: number;

  /**
   * The index of the preset's or instrument's list of modulators in the PMOD or IMOD sub-chunk.
   */
  modulatorIndex: number;
}

export type ZoneMap<T extends Modulator | Generator> = { [key in GeneratorType]?: T };

export interface ZoneItems {
  /**
   * The key range for the zone.
   */
  keyRange?: Range;

  /**
   * The modulators in the zone.
   */
  modulators: ZoneMap<Modulator>;

  /**
   * The generators in the zone.
   */
  generators: ZoneMap<Generator>;
}

export interface ZoneItemsWithReference<R> extends ZoneItems {
  /**
   * Generic reference to an item in the zone.
   */
  reference: R;
}
