import { PresetHeader } from './preset';
import { Zone } from './zone';
import { Modulator } from './modulator';
import { Generator } from './generator';
import { InstrumentHeader } from './instrument';
import { SampleHeader } from './sample';

/**
 * All the data found in the `pdta` sub-chunk.
 */
export interface PresetData {
  /**
   * The preset headers, found in the `PHDR' sub-chunk.
   */
  presetHeaders: PresetHeader[];

  /**
   * The preset zones, found in the `PBAG` sub-chunk.
   */
  presetZones: Zone[];

  /**
   * The preset modulators, found in the `PMOD` sub-chunk.
   */
  presetModulators: Modulator[];

  /**
   * The preset generators, found in the `PGEN` sub-chunk.
   */
  presetGenerators: Generator[];

  /**
   * The instrument headers, found in the `INST` sub-chunk.
   */
  instrumentHeaders: InstrumentHeader[];

  /**
   * The instrument zones, found in the `IBAG` sub-chunk.
   */
  instrumentZones: Zone[];

  /**
   * The instrument modulators, found in the `IMOD` sub-chunk.
   */
  instrumentModulators: Modulator[];

  /**
   * The instrument generators, found in the `IGEN` sub-chunk.
   */
  instrumentGenerators: Generator[];

  /**
   * The sample headers, found in the `SHDR` sub-chunk.
   */
  sampleHeaders: SampleHeader[];
}
