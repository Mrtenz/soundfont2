import { ZoneItems } from './zone';

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

export interface Preset {
  header: PresetHeader;
  zones: ZoneItems[];
}
