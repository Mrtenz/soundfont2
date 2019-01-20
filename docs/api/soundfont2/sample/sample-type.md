# SampleType

`SampleType` is an [enum](https://www.typescriptlang.org/docs/handbook/enums.html) with all the possible sample types.

## Table of Contents

* [`SampleType.Mono`](#sampletypemono)
* [`SampleType.Right`](#sampletyperight)
* [`SampleType.Left`](#sampletypeleft)
* [`SampleType.Linked`](#sampletypelinked)
* [`SampleType.RomMono`](#sampletyperommono)
* [`SampleType.RomRight`](#sampletyperomlinked)
* [`SampleType.RomLeft`](#sampletyperomleft)
* [`SampleType.RomLinked`](#sampletyperomlinked)

## `SampleType.Mono`

* Value: `1`

A sample with only one (mono) channel.

## `SampleType.Right`

* Value: `2`

A sample with two channels, where this sample is the right channel.

## `SampleType.Left`

* Value: `4`

A sample with two channels, where this sample is the left channel.

## `SampleType.Linked`

* Value `8`

This sample type is not fully defined in the SoundFont2 specification and is likely not used.

## `SampleType.RomMono`

* Value `0x8001` (or `32769`)

A sample, stored in the ROM, with only one (mono) channel.

## `SampleType.RomRight`

* Value `0x8002` (or `32770`)

A sample, stored in the ROM, where this sample is the right channel.

## `SampleType.RomLeft`

* Value `0x8004` (or `32772`)

A sample, stored in the ROM, where this sample is the left channel.

## `SampleType.RomLinked`

* Value `0x8008` (or `32776`)

This sample type is not fully defined in the SoundFont2 specification and is likely not used.
