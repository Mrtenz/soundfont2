// Note: This is not a valid SoundFont2 buffer
const buffer = new Uint8Array(32);
const riffLength = buffer.length - 4;

// "RIFF"
buffer[0] = 0x52;
buffer[1] = 0x49;
buffer[2] = 0x46;
buffer[3] = 0x46;

// Length
buffer[4] = riffLength & 0xff;
buffer[5] = (riffLength >> 8) & 0xff;
buffer[6] = (riffLength >> 16) & 0xff;
buffer[7] = (riffLength >> 24) & 0xff;

// "sfbk"
buffer[8] = 0x73;
buffer[9] = 0x66;
buffer[10] = 0x62;
buffer[11] = 0x6b;

const subLength = 8;

// "LIST"
buffer[12] = 0x4c;
buffer[13] = 0x49;
buffer[14] = 0x53;
buffer[15] = 0x54;

// Length
buffer[16] = subLength & 0xff;
buffer[17] = (subLength >> 8) & 0xff;
buffer[18] = (subLength >> 16) & 0xff;
buffer[19] = (subLength >> 24) & 0xff;

// "Foo "
buffer[20] = 0x46;
buffer[21] = 0x6f;
buffer[22] = 0x6f;
buffer[23] = 0x20;

// "INFO"
buffer[24] = 0x49;
buffer[25] = 0x4e;
buffer[26] = 0x46;
buffer[27] = 0x4f;

// Length
buffer[28] = 0x00;
buffer[29] = 0x00;
buffer[30] = 0x00;
buffer[31] = 0x00;

export default buffer;
