/**
 * convert-images.mjs
 * Converts source images to WebP (quality 85)
 * and saves them in src/assets/images/ and assets/images/
 *
 * Run with: npm run convert:images
 */

import sharp from 'sharp'
import { existsSync, mkdirSync, copyFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const SOURCE_DIRS = [
    resolve(root, 'assets/raw-images'),
    resolve(root, 'src/assets/raw-images'),
    resolve(root, 'src/assets/images'),
]

// Primary output: src/assets/images (for imports)
const OUT_DIR = resolve(root, 'src/assets/images')
if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })

// Public output: assets/images (served at /images/* in dev + prod)
const PUBLIC_DIR = resolve(root, 'assets/images')
if (!existsSync(PUBLIC_DIR)) mkdirSync(PUBLIC_DIR, { recursive: true })

const conversions = [
    ['01_hero_panthera_strategy_room.png', 'hero_panthera_strategy_room.webp'],
    ['02_panthera_vs_agency_contrast.png', 'panthera_vs_agency_contrast.webp'],
    ['03_apex_system_renaissance_mural.png', 'apex_system_renaissance_mural.webp'],
    ['04_creation_panthera_hand.png', 'creation_panthera_hand.webp'],
    ['05_system_table_top_view.png', 'system_table_top_view.webp'],
    ['06_mask_filter_application.png', 'mask_filter_application.webp'],
    ['07_renaissance_hands_mirror.png', 'renaissance_hands_mirror.webp'],
    ['08_renaissance_watch.png', 'renaissance_watch.webp'],
    ['09_vsl_thumbnail_manu.png', 'vsl_thumbnail_manu.webp'],
    ['last_night.jpg', 'last_night.webp'],
    ['panthera.png', 'panthera.webp'],
    // Testimonial custom covers
    ['testimonial_gaston_cover.png', 'testimonial_gaston_cover.webp'],
    ['testimonial_laura_cover.png', 'testimonial_laura_cover.webp'],
    ['testimonial_lucas_cover.png', 'testimonial_lucas_cover.webp'],
    ['testimonial_jose_cover.png', 'testimonial_jose_cover.webp'],
    ['testimonial_hilda_cover.png', 'testimonial_hilda_cover.webp'],
    ['panthera_vs_agency_transition.png', 'panthera_vs_agency_transition.webp'],
    ['apex_phase_01_diagnostico.png', 'apex_phase_01_diagnostico.webp'],
    ['apex_phase_02_auditoria.jpg', 'apex_phase_02_auditoria.webp'],
    ['apex_phase_03_estrategia.png', 'apex_phase_03_estrategia.webp'],
    ['apex_phase_04_infraestructura.png', 'apex_phase_04_infraestructura.webp'],
    ['apex_phase_05_implementacion.png', 'apex_phase_05_implementacion.webp'],
    ['apex_phase_06_medicion.png', 'apex_phase_06_medicion.webp'],
    ['apex_phase_07_optimizacion.png', 'apex_phase_07_optimizacion.webp'],
    ['filtro_aplicacion.png', 'filtro_aplicacion.webp'],
    ['cuello_botella.png', 'cuello_botella.webp'],
    ['faqs.png', 'faqs.webp'],
    ['fundador_2.jpg', 'fundador_2.webp'],
    ['fundador_1.jpg', 'fundador_1.webp'],

    // CTA final testimonios
    ['testimonial_cta_case_table.png', 'testimonial_cta_case_table.webp'],
]

let ok = 0
let skipped = 0

for (const [src, dest] of conversions) {
    const srcPath = SOURCE_DIRS
        .map((dir) => resolve(dir, src))
        .find((candidate) => existsSync(candidate))
    const destPath = resolve(OUT_DIR, dest)
    const publicPath = resolve(PUBLIC_DIR, dest)

    if (!srcPath) {
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
