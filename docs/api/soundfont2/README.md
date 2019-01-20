# SoundFont2

## Table of Contents

* [`new SoundFont2(buffer)`](#new-soundfont2buffer)
  * [`SoundFont2.chunk`](#soundfont2chunk)
  * [`SoundFont2.metaData`](#soundfont2metadata)
  * [`SoundFont2.sampleData`](#soundfont2sampledata)
  * [`SoundFont2.samples`](#soundfont2samples)
  * [`SoundFont2.presetData`](#soundfont2presetdata)
  * [`SoundFont2.presets`](#soundfont2presets)
  * [`SoundFont2.instruments`](#soundfont2instruments)
  * [`SoundFont2.banks`](#soundfont2banks)
  * [`SoundFont2.getKeyData(keyNumber, bankNumber, presetNumber)`](#soundfont2getkeydatakeynumber-banknumber-presetnumber)

## `new SoundFont2(buffer)`

* `buffer` [&lt;Uint8Array&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) - The binary SoundFont2 data to parse.

Create a new instance of of the `SoundFont2` class. This may throw a `ParseError` if the SoundFont2 is invalid.

### `SoundFont2.chunk`

* [&lt;SF2Chunk&gt;](https://github.com/Mrtenz/soundfont2/blob/master/src/chunk.ts) - The raw, unparsed chunk data.

### `SoundFont2.metaData`

* [&lt;MetaData&gt;](meta-data.md) - The parsed meta data.

### `SoundFont2.sampleData`

* [&lt;Uint8Array&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) - The full, unparsed sample data.

This includes all the samples in the SoundFont as a single buffer.

### `SoundFont2.samples`

* [&lt;Sample[]&gt;](sample/README.md) - An array of all samples with the sample headers.

### `SoundFont2.presetData`

* [&lt;PresetData&gt;](preset-data.md) - The raw, unparsed preset data.

### `SoundFont2.presets`

* [&lt;Preset[]&gt;](preset.md) - An array of all presets with the preset zones.

### `SoundFont2.instruments`

* [&lt;Instrument[]&gt;](instrument.md) - An array of all instruments with the instrument zones.

### `SoundFont2.banks`

* [&lt;Bank[]&gt;](bank.md) - An array of all MIDI banks with the presets.

### `SoundFont2.getKeyData(keyNumber, bankNumber, presetNumber)`

* `keyNumber` [&lt;number&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) - The MIDI key number.
* `bankNumber` [&lt;number&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) - The MIDI bank number.
* `presetNumber` [&lt;number&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) - The MIDI preset number.
* Returns: [&lt;Key&gt;](key.md)

The result of this function is [memoized](https://en.wikipedia.org/wiki/Memoization).
