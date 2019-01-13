/**
 * Generator (or modulator) types. These are defined in a specific order, following the spec. The
 * enum ID corresponds with the ID in the spec, so the unused and reserved fields should not be
 * removed.
 *
 * TODO: Add documentation to each individual field.
 */
export enum GeneratorType {
  StartAddrOfs,
  EndAddrOfs,
  StartLoopAddrOfs,
  EndLoopAddrOfs,
  StartAddrCoarseOfs,
  ModLFO2Pitch,
  VibLFO2Pitch,
  ModEnv2Pitch,
  FilterFc,
  FilterQ,
  ModLFO2FilterFc,
  ModEnv2FilterFc,
  EndAddrCoarseOfs,
  ModLFO2Vol,
  Unused1,
  ChorusSend,
  ReverbSend,
  Pan,
  Unused2,
  Unused3,
  Unused4,
  ModLFODelay,
  ModLFOFreq,
  VibLFODelay,
  VibLFOFreq,
  ModEnvDelay,
  ModEnvAttack,
  ModEnvHold,
  ModEnvDecay,
  ModEnvSustain,
  ModEnvRelease,
  Key2ModEnvHold,
  Key2ModEnvDecay,
  VolEnvDelay,
  VolEnvAttack,
  VolEnvHold,
  VolEnvDecay,
  VolEnvSustain,
  VolEnvRelease,
  Key2VolEnvHold,
  Key2VolEnvDecay,
  Instrument,
  Reserved1,
  KeyRange,
  VelRange,
  StartLoopAddrCoarseOfs,
  Keynum,
  Velocity,
  Attenuation,
  Reserved2,
  EndLoopAddrCoarseOfs,
  CoarseTune,
  FineTune,
  SampleId,
  SampleModes,
  Reserved3,
  ScaleTune,
  ExclusiveClass,
  OverrideRootKey,
  Dummy
}

/**
 * Describes a range of MIDI key numbers (for the `keyRange` generator) or MIDI velocities (for the
 * `velRange` generator) with a minimum (lo) and maximum (hi) value.
 */
export interface Range {
  /**
   * Low value for the range.
   */
  lo: number;

  /**
   * High value for the range.
   */
  hi: number;
}

export interface Generator {
  /**
   * The ID of the generator.
   */
  id: GeneratorType;

  /**
   * Generator value. If the range is not specified, this should be set.
   */
  amount?: number;

  /**
   * The range of the generator. If the amount is not specified, this should be set.
   */
  range?: {
    /**
     * Low value for the range.
     */
    lo: number;

    /**
     * High value for the range.
     */
    hi: number;
  };
}
