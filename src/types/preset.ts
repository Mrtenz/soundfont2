import { ZoneItems } from './zone';
import { Instrument } from './instrument';

export interface PresetHeader {
  /**
   * The name of the preset.
   */
  name: string;

  /**
   * The MIDI preset number which to apply to the preset.
   */
  preset: number;

  /**
   * The preset bank.
   */
  bank: number;

  /**
   * Index in the preset's zone list found in the preset bag sub-chunk.
   */
  bagIndex: number;

  /**
   * Reserved for future implementation.
   */
  library: number;
  genre: number;
  morphology: number;
}

export interface PresetZone extends ZoneItems {
  /**
   * The instrument for the preset zone.
   */
  instrument: Instrument;
}

export interface Preset {
  /**
   * The preset header.
   */
  header: PresetHeader;

  /**
   * The preset zones.
   */
  zones: PresetZone[];
}
