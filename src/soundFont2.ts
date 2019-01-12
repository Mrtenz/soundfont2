import { Instrument, MetaData, Preset, PresetData, Sample, SampleData } from './types';
import { SF2Chunk } from './chunk';
import { parseBuffer, ParseError } from './riff';
import { DEFAULT_SAMPLE_RATE } from './constants';
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
   * The sample data.
   */
  public readonly sampleData: SampleData;

  /**
   * The unparsed preset data.
   */
  public readonly presetData: PresetData;

  /**
   * The parsed presets.
   */
  public readonly presets: Preset[];

  /**
   * The parsed instuments.
   */
  public readonly instruments: Instrument[];

  /**
   * The parsed samples.
   */
  public readonly samples: Sample[];

  public constructor(chunk: SF2Chunk) {
    this.chunk = chunk;
    this.metaData = chunk.subChunks[0].getMetaData();
    this.sampleData = chunk.subChunks[1].getSampleData();
    this.presetData = chunk.subChunks[2].getPresetData();
    this.presets = this.getPresets();
    this.instruments = this.getInstruments();
    this.samples = this.getSamples();
  }

  /**
   * Parse the raw preset data to presets.
   */
  private getPresets(): Preset[] {
    const { presetHeaders, presetZones, presetGenerators, presetModulators } = this.presetData;

    return getItemsInZone(presetHeaders, presetZones, presetModulators, presetGenerators);
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

    return getItemsInZone(
      instrumentHeaders,
      instrumentZones,
      instrumentModulators,
      instrumentGenerators
    );
  }

  /**
   * Parse the raw sample data and sample headers to samples. If the sample rate of the sample is
   * lower than the default sample rate, it is increased by multiplying the bytes. The raw sample
   * data is converted to a signed 16-bit integer array, since WAV samples (used by SF2) are
   * 16-bit.
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

      let data = new Int16Array(
        new Uint8Array(this.sampleData.subarray(header.start * 2, header.end * 2))
      );

      if (header.name !== 'EOS') {
        while (header.sampleRate < DEFAULT_SAMPLE_RATE) {
          const newSample = new Int16Array(data.length * 2);
          let j;
          for (let i = (j = 0); i < data.length; i++) {
            newSample[j++] = data[i];
            newSample[j++] = data[i];
          }

          data = newSample;

          header.sampleRate *= 2;
          header.startLoop *= 2;
          header.endLoop *= 2;
        }
      }

      return {
        header,
        data
      };
    });
  }
}
