/**
 * The meta data found in the INFO sub-chunk in the SoundFont file.
 */
export interface MetaData {
  /**
   * The SoundFont specification version level to which the file complies, found in the `ifil`
   * sub-chunk. This field is required, if it is not set in the input SoundFont file or it is not
   * exactly 4 bytes in length, the file should be rejected.
   */
  version: string;

  /**
   * The sound engine for which the SoundFont was optimized, found in the `isng` sub-chunk. This
   * field is required, but if it's not set, a default of "EMU8000" can be assumed. This field is
   * case-sensitive.
   */
  soundEngine: string;

  /**
   * The name of the SoundFont compatible bank, found in the `INAM` sub-chunk. This field is
   * required, if it is not set in the input SoundFont file, the file should be rejected.
   */
  name: string;

  /**
   * A wavetable sound data ROM to which any ROM samples refer, found in the `irom` sub-chunk. This
   * field is optional. If the field is missing or references an unknown ROM, it should be ignored
   * and the file should be assumed to not reference ROM samples.
   */
  rom?: string;

  /**
   * A wavetable sound data ROM revision to which any ROM samples refer, found in the `iver`
   * sub-chunk. This field is optional. If the field is set, but is not exactly 4 bytes in length,
   * it should be ignored and the file should be assumed to not reference ROM samples.
   */
  romVersion?: string;

  /**
   * The creation date of the SoundFont file, found in the `ICRD` sub-chunk. This field is
   * optional. Conventionally, the format is 'Month Day, Year', but this is not a requirement.
   */
  creationDate?: string;

  /**
   * The sound designers or engineers responsible for the SoundFont file, found in the `IENG`
   * sub-chunk. This field is optional.
   */
  author?: string;

  /**
   * The product for which the SoundFont file is intended, found in the `IPDR` sub-chunk. This
   * field is optional and case-sensitive.
   */
  product?: string;

  /**
   * Copyright assertion string associated with the SoundFont file, found in the `ICOP` sub-chunk.
   * This field is optional.
   */
  copyright?: string;

  /**
   * Any comments associated with the SoundFont file, found in the `ICMT` sub-chunk. This field is
   * optional.
   */
  comments?: string;

  /**
   * The SoundFont compatible tool, used to create the SoundFile or modify the SoundFont file,
   * sound in the `ISFT` sub-chunk. This field is optional.
   */
  createdBy?: string;
}
