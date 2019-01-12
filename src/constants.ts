export const SF_VERSION_LENGTH = 4;
export const SF_PRESET_HEADER_SIZE = 38;
export const SF_BAG_SIZE = 4;
export const SF_MODULATOR_SIZE = 10;
export const SF_GENERATOR_SIZE = 4;
export const SF_INSTRUMENT_HEADER_SIZE = 22;
export const SF_SAMPLE_HEADER_SIZE = 46;

export const DEFAULT_SAMPLE_RATE = 22050;

export type SF_INFO_CHUNKS =
  | 'ifil'
  | 'isng'
  | 'INAM'
  | 'irom'
  | 'iver'
  | 'ICRD'
  | 'IENG'
  | 'IPRD'
  | 'ICOP'
  | 'ICMT'
  | 'ISFT';
