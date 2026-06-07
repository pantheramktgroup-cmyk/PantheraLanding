/**
 * convert-images.mjs
 * Converts PNG images from src/assets/raw-images/ to WebP (quality 85)
 * and saves them in src/assets/images/
 *
 * Run with: npm run convert:images
 */

import sharp from 'sharp'
import { existsSync, mkdirSync, copyFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

// Primary output: src/assets/images (for imports)
const OUT_DIR = resolve(root, 'src/assets/images')
if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })

// Public output: assets/images (served at /images/* in dev + prod)
const PUBLIC_DIR = resolve(root, 'assets/images')
if (!existsSync(PUBLIC_DIR)) mkdirSync(PUBLIC_DIR, { recursive: true })

const conversions = [
  ['01_hero_panthera_strategy_room.png',  'hero_panthera_strategy_room.webp'],
  ['02_panthera_vs_agency_contrast.png',  'panthera_vs_agency_contrast.webp'],
  ['03_apex_system_renaissance_mural.png','apex_system_renaissance_mural.webp'],
  ['04_creation_panthera_hand.png',       'creation_panthera_hand.webp'],
  ['05_system_table_top_view.png',        'system_table_top_view.webp'],
  ['06_mask_filter_application.png',      'mask_filter_application.webp'],
  ['07_renaissance_hands_mirror.png',     'renaissance_hands_mirror.webp'],
  ['08_renaissance_watch.png',            'renaissance_watch.webp'],
  ['09_vsl_thumbnail_manu.png',           'vsl_thumbnail_manu.webp'],
  // Testimonial custom covers
  ['testimonial_gaston_cover.png',        'testimonial_gaston_cover.webp'],
  ['testimonial_laura_cover.png',         'testimonial_laura_cover.webp'],
  ['testimonial_lucas_cover.png',         'testimonial_lucas_cover.webp'],
  ['testimonial_jose_cover.png',          'testimonial_jose_cover.webp'],
  ['testimonial_hilda_cover.png',         'testimonial_hilda_cover.webp'],
]

let ok = 0
let skipped = 0

for (const [src, dest] of conversions) {
  const srcPath = resolve(root, 'src/assets/raw-images', src)
  const destPath = resolve(OUT_DIR, dest)
  const publicPath = resolve(PUBLIC_DIR, dest)

  if (!existsSync(srcPath)) {
    console.warn(`⚠️  SKIP (not found): ${src}`)
    skipped++
    continue
  }

  try {
    await sharp(srcPath)
      .webp({ quality: 85 })
      .toFile(destPath)
    // Also copy to public dir so it's served at /images/
    copyFileSync(destPath, publicPath)
    console.log(`✓  ${src} → ${dest} (src + public)`)
    ok++
  } catch (err) {
    console.error(`✗  Error converting ${src}: ${err.message}`)
  }
}

console.log(`\nDone: ${ok} converted, ${skipped} skipped (missing source files).`)
if (skipped > 0) {
  console.log('Drop the missing PNG files into src/assets/raw-images/ and run again.')
}
