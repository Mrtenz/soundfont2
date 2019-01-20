# KeyData

## Table of Contents

## `KeyData.keyNumber`

* [&lt;number&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) - The MIDI key number.

This is a MIDI key number between 0 and 127.

## `KeyData.preset`

* [&lt;Preset&gt;](preset.md) - The preset for the key.

## `KeyData.instrument`

* [&lt;Instrument&gt;](instrument.md) - The instrument for the key.

## `KeyData.sample`

* [&lt;Sample&gt;](sample/README.md) - The sample for the key.

## `KeyData.generators`

* [&lt;Generator[]&gt;](../generator/README.md) - The generators for the key.

These are the preset generators merged with the instrument generators. To get the individual generators, you can use `KeyData.preset.generators` or `KeyData.instrument.generators`.

## `KeyData.modulators`

* [&lt;Modulator[]&gt;](../modulator.md) - The modulators for the key.

These are the preset modulators merged with the instrument modulators. To get the individual generators, you can use `KeyData.preset.modulators` or `KeyData.instrument.modulators`.
