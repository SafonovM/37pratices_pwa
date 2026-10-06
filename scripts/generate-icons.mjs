import { createHash } from "node:crypto";
import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "icons");

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? (c >>> 1) ^ 0xedb88320 : c >>> 1;
    }
  }
  return ~c >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type);
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function png(size, { bg, fg, pad = 0 }) {
  const raw = Buffer.alloc((size * 3 + 1) * size);
  for (let y = 0; y < size; y++) {
    const row = y * (size * 3 + 1);
    raw[row] = 0;
    for (let x = 0; x < size; x++) {
      const cx = x + 0.5 - size / 2;
      const cy = y + 0.5 - size / 2;
      const r = size * 0.28;
      const inCircle = cx * cx + cy * cy <= r * r;
      const inset = pad > 0 && (x < pad || y < pad || x >= size - pad || y >= size - pad);
      const color = inset ? bg : inCircle ? fg : bg;
      const i = row + 1 + x * 3;
      raw[i] = color[0];
      raw[i + 1] = color[1];
      raw[i + 2] = color[2];
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

mkdirSync(outDir, { recursive: true });

const cream = [247, 243, 235];
const gold = [139, 105, 20];

writeFileSync(join(outDir, "icon-192.png"), png(192, { bg: cream, fg: gold }));
writeFileSync(join(outDir, "icon-512.png"), png(512, { bg: cream, fg: gold }));
writeFileSync(
  join(outDir, "icon-maskable-512.png"),
  png(512, { bg: cream, fg: gold, pad: 64 })
);
writeFileSync(join(outDir, "apple-touch-icon.png"), png(180, { bg: cream, fg: gold }));

// silence unused import warning if bundlers check
void createHash;
console.log("Icons written to public/icons");
