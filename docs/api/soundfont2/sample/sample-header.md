# SampleHeader

The `SampleHeader` object contains all the meta data for a sample.

## Table of Contents

* [`SampleHeader.name`](#sampleheadername)
* [`SampleHeader.start`](#sampleheaderstart)
* [`SampleHeader.end`](#sampleheaderend)
* [`SampleHeader.startLoop`](#sampleheaderstartloop)
* [`SampleHeader.endLoop`](#sampleheaderendloop)
* [`SampleHeader.sampleRate`](#sampleheadersamplerate)
* [`SampleHeader.originalPitch`](#sampleheaderoriginalpitch)
* [`SampleHeader.pitchCorrection`](#sampleheaderpitchcorrection)
* [`SampleHeader.link`](#sampleheaderlink)
* [`SampleHeader.type`](#sampleheadertype)

## `SampleHeader.name`

* [&lt;string&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) - The name of the sample.

This name should be unique.

## `SampleHeader.start`

* [&lt;number&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) - The start of the sample data in the `smpl` chunk.

Note that the sample data in the [`Sample`](README.md) object is already the correct sample data.

## `SampleHeader.end`

* [&lt;number&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) - The end of the sample data in the `smpl` chunk.

Note that the sample data in the [`Sample`](README.md) object is already the correct sample data.

## `SampleHeader.startLoop`

* [&lt;number&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) - The index in sample data points, where the sample should start the loop.

The `startLoop` index is corrected by the `start` value.

## `SampleHeader.endLoop`

* [&lt;number&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) - The index in sample data points, where the sample should end the loop.

The `endLoop` index is corrected by the `start` value.

## `SampleHeader.sampleRate`

* [&lt;number&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) - The sample rate in hertz.

## `SampleHeader.originalPitch`

* [&lt;number&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) - The MIDI key number of the recorded pitch of the sample.

This is a number between 0 and 127, or 255 if the sample is unpitched.

## `SampleHeader.pitchCorrection`

* [&lt;number&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) - The pitch correction in cents that should be applied to the sample on playback.

This is to compensate for any pitch errors during the recording of the sample.

## `SampleHeader.link`

* [&lt;number&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) - The sample header index of the associated left or right sample.

Both samples should be played at the same time, with the pitch being controlled by the right sample's generators.

## `SampleHeader.type`

* [&lt;SampleType&gt;](sample-type.md) - The type of the sample.
