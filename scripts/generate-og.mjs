// One-off: rasterize a branded Open Graph card to public/og-image.png (1200x630).
// Run: node scripts/generate-og.mjs
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, '..', 'public', 'og-image.png');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#7C3AED"/>
      <stop offset="0.4" stop-color="#C026D3"/>
      <stop offset="0.7" stop-color="#F0167A"/>
      <stop offset="1" stop-color="#FF6B1A"/>
    </linearGradient>
    <radialGradient id="blobA" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#7C3AED" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#7C3AED" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="blobB" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#F0167A" stop-opacity="0.5"/>
      <stop offset="1" stop-color="#F0167A" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="#0A0A0F"/>
  <circle cx="170" cy="140" r="320" fill="url(#blobA)"/>
  <circle cx="1050" cy="540" r="360" fill="url(#blobB)"/>

  <g font-family="DejaVu Sans, Verdana, sans-serif">
    <text x="90" y="150" font-size="26" font-weight="bold" fill="#7B7B9A" letter-spacing="2">INDIA’S CREATOR MARKETPLACE</text>

    <text x="84" y="340" font-size="150" font-weight="bold" letter-spacing="-6">
      <tspan fill="#F8F7FF">creator</tspan><tspan fill="url(#g)">gig</tspan>
    </text>

    <text x="90" y="430" font-size="50" font-weight="bold" fill="#F8F7FF" letter-spacing="-1">Turn your following into your income.</text>

    <text x="90" y="500" font-size="30" fill="#7B7B9A">Real numbers. Real deals. Real income.</text>
  </g>

  <rect x="90" y="548" width="220" height="8" rx="4" fill="url(#g)"/>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log('Wrote', out);
