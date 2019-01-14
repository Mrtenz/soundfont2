export enum TransformType {
  /**
   * The output value of the multiplier is fed directly to the summing node of the given
   * destination.
   */
  Linear = 0,

  /**
   * The output value of the multiplier is to be the absolute value of the input value, as defined
   * by the relationship:
   *
   * `output = Math.sqrt(input ** 2)`
   */
  Absolute = 2
}

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
  transform: TransformType;
}
