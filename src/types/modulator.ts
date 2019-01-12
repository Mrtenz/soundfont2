export interface Modulator {
  /**
   * Destination generator.
   */
  id: number;

  /**
   * Source modulator.
   */
  source: number;

  /**
   * Degree of modulation.
   */
  amount: number;

  /**
   * Source controls amount of first.
   *
   * TODO: Description is unclear. Should be improved.
   */
  amountSource: number;

  /**
   * Transform applied to source.
   */
  transform: number;
}
