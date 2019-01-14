# soundfont2

This is a SoundFont2 parser, written in TypeScript. It works in Node.js and web browsers. The SoundFont2 parser is based on the [SoundFont Technical Specification, version 2.01](http://www.synthfont.com/SFSPEC21.PDF), but is not fully compliant yet. In the future, the library will be updated to support SoundFont version 2.04, which adds support for 24-bit WAV samples.

The library is not ready for production right now. SoundFonts may be parsed improperly and the API may be changed in the future.

## Getting Started

```bash
yarn add soundfont2
```

### Example

```typescript
import * as fs from 'fs'; 
import { SoundFont2 } from 'soundfont2';

// Get Piano.SF2 as binary buffer
const buffer = fs.readFileSync('./Piano.SF2');

try {
  const soundFont = SoundFont2.from(buffer);
  // Do something with the SoundFont
} catch (error) {
  console.log('Failed to load the SoundFont', error);
}
```

## SoundFont2 structure

A SoundFont2 file consists of one or more presets. The presets have preset zones, that refer to one or more instruments. Each instrument has one or more instrument zones, that refers to a single sample (16-bit WAV). You can find an overview of the structure in the image below.

![SoundFont2 diagram](https://i.imgur.com/c2Gud3u.png)

This library parses the SoundFont2 file in the same way and all the top-level presets are available as the `presets` property.
