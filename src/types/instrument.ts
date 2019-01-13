import { ZoneItems } from './zone';
import { Sample } from './sample';

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

export interface InstrumentZone extends ZoneItems {
  /**
   * The sample for the instrument zone.
   */
  sample: Sample;
}

export interface Instrument {
  /**
   * The instrument header.
   */
  header: InstrumentHeader;

  /**
   * The instrument zones.
   */
  zones: InstrumentZone[];
}
