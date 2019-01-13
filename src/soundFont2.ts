import {
  GeneratorType,
  Instrument,
  MetaData,
  Preset,
  PresetData,
  Sample,
  SampleData
} from './types';
import { SF2Chunk } from './chunk';
import { parseBuffer, ParseError } from './riff';
import { getItemsInZone } from './chunks';

export class SoundFont2 {
  /**
   * Create a new `SoundFont2` instance from a raw input buffer.
   *
   * @param {Uint8Array} buffer
   */
  public static from(buffer: Uint8Array): SoundFont2 {
    const chunk = parseBuffer(buffer);
    const sf2Chunk = new SF2Chunk(chunk);

    if (sf2Chunk.subChunks.length !== 3) {
      throw new ParseError(
        'Invalid sfbk structure',
        '3 chunks',
        `${chunk.subChunks.length} chunks`
      );
    }

    return new SoundFont2(sf2Chunk);
  }

  /**
   * The raw RIFF chunk data.
   */
  public readonly chunk: SF2Chunk;

  /**
   * The meta data.
   */
  public readonly metaData: MetaData;

  /**
   * The raw sample data.
   */
  public readonly sampleData: SampleData;

  /**
   * The parsed samples.
   */
  public readonly samples: Sample[];

  /**
   * The unparsed preset data.
   */
  public readonly presetData: PresetData;

  /**
   * The parsed instuments.
   */
  public readonly instruments: Instrument[];

  /**
   * The parsed presets.
   */
  public readonly presets: Preset[];

  public constructor(chunk: SF2Chunk) {
    this.chunk = chunk;
    this.metaData = chunk.subChunks[0].getMetaData();
    this.sampleData = chunk.subChunks[1].getSampleData();
    this.presetData = chunk.subChunks[2].getPresetData();

    this.samples = this.getSamples();
    this.instruments = this.getInstruments();
    this.presets = this.getPresets();
  }

  /**
   * Parse the raw preset data to presets.
   */
  private getPresets(): Preset[] {
    const { presetHeaders, presetZones, presetGenerators, presetModulators } = this.presetData;

    const presets = getItemsInZone(
      presetHeaders,
      presetZones,
      presetModulators,
      presetGenerators,
      this.instruments,
      GeneratorType.Instrument
    );

    return presets.map(preset => {
      return {
        header: preset.header,
        zones: preset.zones.map(zone => {
          return {
            keyRange: zone.keyRange,
            generators: zone.generators,
            modulators: zone.modulators,
            instrument: zone.reference
          };
        })
      };
    });
  }

  /**
   * Parse the raw instrument data (found in the preset data) to instruments.
   */
  private getInstruments(): Instrument[] {
    const {
      instrumentHeaders,
      instrumentZones,
      instrumentModulators,
      instrumentGenerators
    } = this.presetData;

    const instruments = getItemsInZone(
      instrumentHeaders,
      instrumentZones,
      instrumentModulators,
      instrumentGenerators,
      this.samples,
      GeneratorType.SampleId
    );

    return instruments.map(instrument => {
      return {
        header: instrument.header,
        zones: instrument.zones.map(zone => {
          return {
            keyRange: zone.keyRange,
            generators: zone.generators,
            modulators: zone.modulators,
            sample: zone.reference
          };
        })
      };
    });
  }

  /**
   * Parse the raw sample data and sample headers to samples. The sample data should be converted
   * to a 16-bit array before playing it, since WAV files are usually 16-bit.
   */
  private getSamples(): Sample[] {
    return this.presetData.sampleHeaders.map(header => {
      // Sample rate must be above 0
      if (header.name !== 'EOS' && header.sampleRate <= 0) {
        throw new Error(
          `Illegal sample rate of ${header.sampleRate} hz in sample '${header.name}'`
        );
      }

      // Original pitch cannot be between 128 and 254
      if (header.originalPitch >= 128 && header.originalPitch <= 254) {
        header.originalPitch = 60;
      }

      const data = this.sampleData.subarray(header.start, header.end);

      return {
        header,
        data
      };
    });
  }
}
