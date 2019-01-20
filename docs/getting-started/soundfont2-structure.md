# SoundFont2 Structure

This section explains a bit about the general SoundFont2 structure. It's not necessarily required to know this information in order to use the library, but it may make it easier to understand how the library and SoundFonts work.

## Table of Contents

* [General Structure](#general-structure)
* [RIFF Chunks](#riff-chunks)
  * [`INFO` Chunk](#info-chunk)
  * [`smpl` Chunk](#smpl-chunk)
  * [`pdta` Chunk](#pdta-chunk)
    * [Preset Data](#preset-data)
    * [Instrument Data](#instrument-data)
    * [Sample Data](#sample-data)
* [Presets](#presets)
* [Instruments](#instruments)
    
## General Structure

A SoundFont has one or more presets, which can normally be selected with the `MIDI Program Change` command. The presets have one or more preset zones, that have one instrument. The instruments have instrument zones and these have one sample each.

Multiple preset zones can refer to the same instrument and multiple instrument zones can refer to the same samples.

![General Structure](https://i.imgur.com/c2Gud3u.png)

## RIFF Chunks

A SoundFont2 file is a RIFF (Resource Interchange File Format) file, which contains multiple chunks. Those chunks are identified by a [FourCC (four-character code)](https://en.wikipedia.org/wiki/FourCC). If an identifier is not for characters long, it will be padded by spaces. For example, "foo" would be read as "foo ".

Every SoundFont2 file should have at least three top-level sub-chunks: an `INFO` chunk containing metadata, a `sdta` chunk containing Wave Audio (WAV) samples and a `pdta` header containing the preset, instrument and sample headers.

All the raw (unparsed) data is available in the `SoundFont2` class, as `metaData`, `sampleData` and `presetData`.

![SoundFont2 RIFF chunks](https://i.imgur.com/BL8FvcC.png)

### `INFO` Chunk

The `INFO` chunk contains at least the following sub-chunks.

* `ifil` - The SoundFont specification version.
  
  Available as `metaData.version`.
  
* `isng` - The sound engine for which the SoundFont was optimized.

  Available as `metaData.soundEngine`.
  
* `INAM` - The name of the SoundFont.

  Available as `metaData.name`.

The other sub-chunks are **optional**.

* `irom` - A sound data ROM to which any ROM samples refer.

  Available as `metaData.rom`.
  
* `iver` - A sound data ROM revision to which any ROM samples refer.

  Available as `metaData.romVersion`.

* `ICRD` - The creation date of the SoundFont, conventionally in the 'Month Day, Year' format.

  Available as `metaData.creationDate`.
  
* `IENG` - The author or authors of the SoundFont.

  Available as `metaData.author`.
  
* `IPDR` - The product for which the SoundFont is intended.

  Available as `metaData.product`.
  
* `ICOP` - Copyright assertion string associated with the SoundFont.

  Available as `metaData.copyright`.
  
* `ICMT` - Any comments associated with the SoundFont.

  Available as `metaData.comments`.
  
* `ISFT` - The tool used to create the SoundFont.

  Available as `metaData.createdBy`.
  
### `sdta` Chunk

The sample chunk has one or two sub-chunks.

* `smpl` - The 16-bit WAV sample data.

  Available as `sampleData`.
  
* `sm24` - The 8-bit WAV sample data, in addition to the 16-bit data.

  Currently not available in the API.
  
The `sdta` and `sm24` sub-chunks can be combined to get 24-bit WAV sample data, but the library currently does not support this yet.

### `pdta` Chunk

The `pdta` sub-chunk contains data for presets, instruments and samples in the SoundFont. There are four preset and four instrument chunks, which form the instruments and presets. There is just one sample header chunk, that forms the samples together with the data from the `sdta` chunk.

#### Preset Data

The `pdta` has four sub-chunks that form the preset data.

* `phdr` - The preset headers.

  Available as `presetData.presetHeaders`.
  
* `pbag` - The preset zone indices.

  Available as `presetData.presetZones`.
  
* `pmod` - The preset modulators.

  Available as `presetData.presetModulators`
  
* `pgen` - The preset generators.

  Available as `presetData.presetGenerators`

#### Instrument Data

The `pdta` has four sub-chunks that form the instrument data.

* `inst` - The instrument headers.

  Available as `presetData.instrumentHeaders`.
  
* `ibag` - The instrument zone indices.

  Available as `presetData.instrumentZones`.
  
* `imod` - The instrument modulators.

  Available as `presetData.instrumentModulators`
  
* `igen` - The instrument generators.

  Available as `presetData.instrumentGenerators`

#### Sample Data

The `pdta` has one sub-chunk with the sample header data.

* `shdr` - The sample headers.

  Available as `presetData.sampleHeaders`
  
## Presets

TODO

## Instruments

TODO
