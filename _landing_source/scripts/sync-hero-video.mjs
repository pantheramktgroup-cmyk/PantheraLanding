import { createWriteStream, existsSync, mkdirSync, renameSync, statSync, unlinkSync } from 'fs'
import { dirname, resolve } from 'path'
import { pipeline } from 'stream/promises'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const HERO_VIDEO_ID = '1nO3ZRhccb1Aou5oHgqy4TBJGF6pTt55e'
const OUTPUT_PATH = resolve(root, 'assets/videos/hero-panthera-loop.mp4')
const TEMP_PATH = `${OUTPUT_PATH}.download`
const DRIVE_URLS = [
  `https://drive.usercontent.google.com/download?id=${HERO_VIDEO_ID}&export=download`,
  `https://drive.google.com/uc?export=download&id=${HERO_VIDEO_ID}`,
]

async function getDownloadResponse() {
  for (const url of DRIVE_URLS) {
    try {
      const response = await fetch(url, { redirect: 'follow' })
      const contentType = response.headers.get('content-type') || ''
      if (response.ok && contentType.includes('video/')) {
        return { response, url }
      }
    } catch (error) {
      console.warn(`Hero video fetch failed for ${url}: ${error.message}`)
    }
  }

  throw new Error('Unable to download hero video from Drive.')
}

async function syncHeroVideo() {
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true })

  const { response, url } = await getDownloadResponse()
  const remoteSize = Number(response.headers.get('content-length') || 0)

  if (existsSync(OUTPUT_PATH) && remoteSize > 0 && statSync(OUTPUT_PATH).size === remoteSize) {
    console.log(`Hero video already up to date from ${url}`)
    return
  }

  try {
    await pipeline(response.body, createWriteStream(TEMP_PATH))
    renameSync(TEMP_PATH, OUTPUT_PATH)
    console.log(`Synced hero video from ${url}`)
  } catch (error) {
    if (existsSync(TEMP_PATH)) {
      unlinkSync(TEMP_PATH)
    }
    throw error
  }
}

await syncHeroVideo()