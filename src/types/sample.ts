/**
 * SoundFont2 samples are in the WAV format, meaning that they consist of a signed 16-bit array,
 * instead of a unsigned 8-bit array, which is read by default. The sample data in the `smpl`
 * sub-chunk is parsed as Int16Array before creating a sample.
 */
export type SampleData = Int16Array;

/**
 * The sample type, found in the `type` field in the header.
 */
export enum SampleType {
  EOS = 0,
  Mono = 1,
  Right = 2,
  Left = 4,
  Linked = 8,
  RomMono = 32769,
  RomRight = 32770,
  RomLeft = 32772,
  RomLinked = 32776
}

export interface SampleHeader {
  /**
   * The name of the sample. This may be EOS, indicating end of samples, with all of the other
   * values set to zero.
   */
  name: string;

  /**
   * The start of the sample in data points, from the beginning of the sample data field to the
   * first data point of the sample.
   */
  start: number;

  /**
   * The end of the sample in data points, from the beginning of the sample data field to the first
   * set of 46 zero valued data points following this sample.
   */
  end: number;

  /**
   * The index in sample data points, from the beginning of the sample data field to the first data
   * point in the loop of this sample.
   */
  startLoop: number;

  /**
   * The index in sample data points, from the beginning of the sample data field to the first data
   * point following the loop of this sample.
   */
  endLoop: number;

  /**
   * The sample rate in hertz, at which the sample was acquired or to which it was most recently
   * converted. The value should be between 400 and 50000 hertz, but this is not a strict
   * requirement. A value of zero is illegal.
   */
  sampleRate: number;

  /**
   * The MIDI key number of the recorded pitch of the sample. For unpitched sounds, this should be
   * a value of 255. Values between 128 and 254 are illegal and a value of 60 should be used
   * instead.
   */
  originalPitch: number;

  /**
   * The pitch correction in cents that should be applied to the sample on playback, to compensate
   * for any pitch errors during the sample recording.
   */
  pitchCorrection: number;

  /**
   * The sample header index of the associated left or right sample, if the sample type is a left
   * or right type. Both samples should be played at the same time, with the pitch controlled by
   * the right sample's generators.
   */
  link: number;

  /**
   * Indicates the type of sample.
   */
  type: SampleType;
}

export interface Sample {
  /**
   * The sample header containing the meta data.
   */
  header: SampleHeader;

  /**
   * The sample data parsed as Int16Array.
   */
  data: SampleData;
}
