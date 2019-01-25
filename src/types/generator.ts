/**
 * Generator (or modulator) types. These are defined in a specific order, following the spec. The
 * enum ID corresponds with the ID in the spec, so the unused and reserved fields should not be
 * removed.
 */
export enum GeneratorType {
  /**
   * The offset in sample data points beyond the `start` sample header.
   */
  StartAddrsOffset,

  /**
   * The offset in sample data points beyond the `end` sample header.
   */
  EndAddrsOffset,

  /**
   * The offset in sample data points beyond the `startLoop` sample header to the first sample data
   * point to be repeated in the loop for the instrument.
   */
  StartLoopAddrsOffset,

  /**
   * The offset in sample data points beyond the `endLoop` sample header to the sample data point
   * considered equivalent to the `startLoop` sample data point for the loop for this instrument.
   */
  EndLoopAddrsOffset,

  /**
   * The offset in 32768 sample data point increments beyond the `start` sample header and the
   * first sample data point to be played in the instrument.
   */
  StartAddrsCoarseOffset,

  /**
   * The degree (in cents) to which a full scale excursion of the modulation LFO will influence the
   * pitch.
   */
  ModLFOToPitch,

  /**
   * The degree (in cents) to which a full scale excursion of the vibrato LFO will influence the
   * pitch.
   */
  VibLFOToPitch,

  /**
   * The degree (in cents) to which a full scale excursion of the modulation envelope will
   * influence pitch.
   */
  ModEnvToPitch,

  /**
   * The cutoff and resonant frequency of the lowpass filter in absolute cent units.
   */
  InitialFilterFc,

  /**
   * The height above DC gain in centibels which the filter resonance exhibits at the cutoff
   * latency.
   */
  InitialFilterQ,

  /**
   * The degree (in cents) to which a full scale excursion of the modulation LFO will influence the
   * filter cutoff frequency.
   */
  ModLFOToFilterFc,

  /**
   * The degree (in cents) to which a full scale excursion of the modulation envelope will
   * influence the filter cutoff frequency.
   */
  ModEnvToFilterFc,

  /**
   * The offset in 32768 sample data point increments beyond the `end` sample header and the last
   * sample data point to be played in this instrument.
   */
  EndAddrsCoarseOffset,

  /**
   * The degree (in centibels) to which a full scale excursion of the modulation LFO will influence
   * volume.
   */
  ModLFOToVolume,

  /**
   * Unused generator. If this generator is encountered, it should be ignored.
   */
  Unused1,

  /**
   * The degree (in 0.1% units) to which the audio output of the note is sent to the chorus effects
   * processor.
   */
  ChorusEffectsSend,

  /**
   * The degree (in 0.1% units) to which the audio output of the note is sent to the reverb effects
   * processor.
   */
  ReverbEffectsSend,

  /**
   * The degree (in 0.1% units) to which the dry audio output of the note is positioned to the left
   * or right output.
   */
  Pan,

  /**
   * Unused generator. If this generator is encountered, it should be ignored.
   */
  Unused2,

  /**
   * Unused generator. If this generator is encountered, it should be ignored.
   */
  Unused3,

  /**
   * Unused generator. If this generator is encountered, it should be ignored.
   */
  Unused4,

  /**
   * The delay time (in absolute timecents) from key on until the modulation LFO begins its upward
   * ramp from zero value. A value of zero indicates a one second delay.
   */
  DelayModLFO,

  /**
   * The frequency (in absolute cents) of the modulation LFO's triangular period. A value of 0
   * indicates a frequency of 8.176 Hz.
   */
  FreqModLFO,

  /**
   * The delay time (in absolute timecents) from key on until the vibrato LFO begins its upwards
   * ramp from zero value. A value of zero indicates a one second delay.
   */
  DelayVibLFO,

  /**
   * The frequency (in absolute cents) of the vibrato LFO's triangular period. A value of zero
   * indicates a frequency of 8.176 Hz.
   */
  FreqVibLFO,

  /**
   * The delay time (in absolute timecents) between key on and the start of the attack phase on the
   * modulation envelope. A value of zero indicates a one second delay.
   */
  DelayModEnv,

  /**
   * The time (in absolute timecents) from the end of the modulation envelope delay time until the
   * point at which the modulation envelope value reaches its peak.
   */
  AttackModEnv,

  /**
   * The time (in absolute timecents) from the end of the attack phase to the entry into decay
   * phase, during which the envelope value is held at its peak. A value of zero indicates a one
   * second hold time.
   */
  HoldModEnv,

  /**
   * The time (in absolute timecents) for a 100% change in the modulation envelope value during
   * decay phase.
   */
  DecayModEnv,

  /**
   * The decrease in level (expressed in 0.1% units) to which the modulation envelope ramps during
   * the decay phase.
   */
  SustainModEnv,

  /**
   * The time (in absolute timecents) for a 100% change in the modulation envelope value during
   * release phase.
   */
  ReleaseModEnv,

  /**
   * The degree (in timecents per key number units) to which the hold time of the modulation
   * envelope is decreased by increasing the MIDI key number.
   */
  KeyNumToModEnvHold,

  /**
   * The degree (in timecents per key number units) to which the hold time of the modulation
   * envelope is decreased by increasing the MIDI key number.
   */
  KeyNumToModEnvDecay,

  /**
   * The delay time (in absolute timecents) between key on and the start of the attack phase of the
   * volume envelope. A value of zero indicates a one second delay.
   */
  DelayVolEnv,

  /**
   * The delay time (in absolute timecents) from the end of the volume envelope delay time until
   * the point at which the volume envelope value reaches its peak.
   */
  AttackVolEnv,

  /**
   * The time (in absolute timecents) from the end of the attack phase to the entry into decay
   * phase during which the volume envelope value is held at its peak. A value of zero indicates a
   * one second hold time.
   */
  HoldVolEnv,

  /**
   * The time (in absolute timecents) for a 100% change in the volume envelope value during decay
   * phase.
   */
  DecayVolEnv,

  /**
   * The decrease in level (expressed in centibels) to which the volume envelope value ramps during
   * the decay phase.
   */
  SustainVolEnv,

  /**
   * The time (in absolute centibels) for a 100% change in the volume envelope during release
   * phase. A value of zero indicates a one second decay time.
   */
  ReleaseVolEnv,

  /**
   * The degree (in timecents per key number units) to which the hold time of the volume envelope
   * is increased by increasing the MIDI key number.
   */
  KeyNumToVolEnvHold,

  /**
   * The degree (in timecents per key number units) to which the hold time of the volume envelope
   * is decreased by increasing the MIDI key number.
   */
  KeyNumToVolEnvDecay,

  /**
   * Index of an instrument in the `INST` sub-chunk. This generator and `SampleId` are the only
   * Index generators.
   */
  Instrument,

  /**
   * Unused generator, reserved for future implementation. If this generator is encountered, it
   * should be ignored.
   */
  Reserved1,

  /**
   * The key range that the preset or instrument zone applies to. This generator and `VelRange` are
   * the only Range generators.
   */
  KeyRange,

  /**
   * The velocity range that the preset or instrument zone applies to. This generator and
   * `KeyRange` are the only Range generators.
   */
  VelRange,

  /**
   * The offset in 32768 sample data point increments beyond the `startLoop` sample header and the
   * first sample data point to be repeated in this instrument's loop.
   */
  StartLoopAddrsCoarseOffset,

  /**
   * Forces the MIDI key number to be interpreted as the value given. This can only appear at
   * instrument level and must be between 0 and 127.
   */
  KeyNum,

  /**
   * Forces the MIDI velocity to be interpreted as the value given. This can only appear at
   * instrument level and must be between 0 and 127.
   */
  Velocity,

  /**
   * The attenuation (in centibels) by which a note is attenuated below full scale.
   */
  InitialAttenuation,

  /**
   * Unused generator, reserved for future implementation. If this generator is encountered, it
   * should be ignored.
   */
  Reserved2,

  /**
   * The offset in 32768 sample data point increments beyond the `endLoop` sample header to the
   * sample data point considered equivalent to the `startLoop`.
   */
  EndLoopAddrsCoarseOffset,

  /**
   * The pitch offset (in semitones) which should be applied to the note. It is additive with
   * `FineTune`.
   */
  CoarseTune,

  /**
   * The pitch offset (in cents) which should be applied to the note. It is additive with
   * `CoarseTune`.
   */
  FineTune,

  /**
   * Index of a sample in the `SHDR` sub-chunk. This generator and `Instrument` are the only Index
   * generators.
   */
  SampleId,

  /**
   * The value which gives a variety of boolean flags describing the sample for the current
   * instrument zone. A zero indicates a sound reproduced with no loop, one indicates a sound which
   * loops continuously and three indicates a sound which loops for the duration of key depression,
   * then proceeds to play the remainder of the sample.
   */
  SampleModes,

  /**
   * Unused generator, reserved for future implementation. If this generator is encountered, it
   * should be ignored.
   */
  Reserved3,

  /**
   * The degree to which the MIDI key number influences pitch.
   */
  ScaleTuning,

  /**
   * The capability for key depression in a given instrument to terminate the playback of other
   * instruments.
   */
  ExclusiveClass,

  /**
   * The MIDI key number at which the sample is to be played back at its original sample rate. If
   * not present, or if present with a value of -1, the sample header parameter original key is
   * used in its place.
   */
  OverridingRootKey,

  /**
   * Unused generator. If this generator is encountered, it should be ignored.
   */
  Unused5,

  /**
   * Unused generator. If this generator is encountered, it should be ignored.
   */
  EndOper
}

/**
 * All unused generators.
 */
export type UnusedGenerator =
  | GeneratorType.Unused1
  | GeneratorType.Unused2
  | GeneratorType.Unused3
  | GeneratorType.Unused4
  | GeneratorType.Unused5
  | GeneratorType.Reserved1
  | GeneratorType.Reserved2
  | GeneratorType.Reserved3
  | GeneratorType.EndOper;

/**
 * All range generators.
 */
export type RangeGenerator = GeneratorType.KeyRange | GeneratorType.VelRange;

/**
 * All index generators.
 */
export type IndexGenerator = GeneratorType.Instrument | GeneratorType.SampleId;

/**
 * All value generators.
 */
export type ValueGenerator = Exclude<
  GeneratorType,
  UnusedGenerator | RangeGenerator | IndexGenerator
>;

/**
 * The default value for all generator types (where applicable).
 */
export const DEFAULT_GENERATOR_VALUES: { [key in ValueGenerator]: number } = {
  [GeneratorType.StartAddrsOffset]: 0,
  [GeneratorType.EndAddrsOffset]: 0,
  [GeneratorType.StartLoopAddrsOffset]: 0,
  [GeneratorType.EndLoopAddrsOffset]: 0,
  [GeneratorType.StartAddrsCoarseOffset]: 0,
  [GeneratorType.ModLFOToPitch]: 0,
  [GeneratorType.VibLFOToPitch]: 0,
  [GeneratorType.ModEnvToPitch]: 0,
  [GeneratorType.InitialFilterFc]: 13500,
  [GeneratorType.InitialFilterQ]: 0,
  [GeneratorType.ModLFOToFilterFc]: 0,
  [GeneratorType.ModEnvToFilterFc]: 0,
  [GeneratorType.EndAddrsCoarseOffset]: 0,
  [GeneratorType.ModLFOToVolume]: 0,
  [GeneratorType.ChorusEffectsSend]: 0,
  [GeneratorType.ReverbEffectsSend]: 0,
  [GeneratorType.Pan]: 0,
  [GeneratorType.DelayModLFO]: -12000,
  [GeneratorType.FreqModLFO]: 0,
  [GeneratorType.DelayVibLFO]: -12000,
  [GeneratorType.FreqVibLFO]: 0,
  [GeneratorType.DelayModEnv]: -12000,
  [GeneratorType.AttackModEnv]: -12000,
  [GeneratorType.HoldModEnv]: -12000,
  [GeneratorType.DecayModEnv]: -12000,
  [GeneratorType.SustainModEnv]: 0,
  [GeneratorType.ReleaseModEnv]: -12000,
  [GeneratorType.KeyNumToModEnvHold]: 0,
  [GeneratorType.KeyNumToModEnvDecay]: 0,
  [GeneratorType.DelayVolEnv]: -12000,
  [GeneratorType.AttackVolEnv]: -12000,
  [GeneratorType.HoldVolEnv]: -12000,
  [GeneratorType.DecayVolEnv]: -12000,
  [GeneratorType.SustainVolEnv]: 0,
  [GeneratorType.ReleaseVolEnv]: -12000,
  [GeneratorType.KeyNumToVolEnvHold]: 0,
  [GeneratorType.KeyNumToVolEnvDecay]: 0,
  [GeneratorType.StartLoopAddrsCoarseOffset]: 0,
  [GeneratorType.KeyNum]: -1,
  [GeneratorType.Velocity]: -1,
  [GeneratorType.InitialAttenuation]: 0,
  [GeneratorType.EndLoopAddrsCoarseOffset]: 0,
  [GeneratorType.CoarseTune]: 0,
  [GeneratorType.FineTune]: 0,
  [GeneratorType.SampleModes]: 0,
  [GeneratorType.ScaleTuning]: 100,
  [GeneratorType.ExclusiveClass]: 0,
  [GeneratorType.OverridingRootKey]: -1
};

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
  value?: number;

  /**
   * The range of the generator. If the value is not specified, this should be set.
   */
  range?: Range;
}
