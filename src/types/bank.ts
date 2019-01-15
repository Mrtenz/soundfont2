import { Preset } from './preset';

/**
 * Describes a MIDI bank.
 */
export interface Bank {
  /**
   * The presets in the bank.
   */
  presets: Preset[];
}
