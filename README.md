# soundfont2

This is a SoundFont2 parser, written in TypeScript. It works in Node.js and web browsers. The SoundFont2 parser is based on the [SoundFont Technical Specification, version 2.01](http://www.synthfont.com/SFSPEC21.PDF), but is not fully compliant yet.

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
