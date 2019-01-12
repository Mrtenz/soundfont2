import { ZoneItems } from './zone';

export interface InstrumentHeader {
  /**
   * The name of the instrument.
   */
  name: string;

  /**
   * Index in the instrument's zone list found in the instrument bag sub-chunk.
   */
  bagIndex: number;
}

export interface Instrument {
  header: InstrumentHeader;
  zones: ZoneItems[];
}
