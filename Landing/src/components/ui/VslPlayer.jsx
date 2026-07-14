import { useState } from 'react'
import { landingCopy } from '../../content/landingCopy'

const vslThumbnail = '/images/vsl_thumbnail_manu.webp'
const { video } = landingCopy

export default function VslPlayer({ className = '', title = 'Manifiesto Panthera' }) {
  const [playing, setPlaying] = useState(false)

  const videoSrc = playing
    ? `${video.videoEmbedUrl}${video.videoEmbedUrl.includes('?') ? '&' : '?'}autoplay=1`
    : video.videoEmbedUrl

  return (
    <div
      className={className}
      style={{
        aspectRatio: '16/9',
        border: '1px solid rgba(245,245,245,0.14)',
        borderRadius: '2px',
        background: '#000',
        boxShadow:
          '0 0 0 1px rgba(245,245,245,0.06), 0 14px 42px rgba(0,0,0,0.42)',
      }}
    >
      <div className="relative h-full w-full overflow-hidden">
        {!playing ? (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 z-20 block h-full w-full cursor-pointer appearance-none border-0 bg-transparent p-0 group"
            aria-label="Reproducir video"
          >
            <img
              src={vslThumbnail}
              alt="Miniatura del video Manifiesto Panthera"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ filter: 'grayscale(1) brightness(0.62) contrast(1.12)' }}
              loading="lazy"
            />

            <div className="absolute inset-0 bg-panthera-black/50 transition-colors duration-300 group-hover:bg-panthera-black/40" />

            <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <span className="inline-flex h-14 w-14 items-center justify-center border border-panthera-green/65 bg-black/72 text-panthera-green shadow-[0_0_30px_rgba(227,247,141,0.18)] transition-all duration-300 group-hover:scale-[1.03] group-hover:border-panthera-green">
                <svg viewBox="0 0 24 24" className="ml-0.5 h-6 w-6 fill-current" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </button>
        ) : (
          <iframe
            src={videoSrc}
            title={title}
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 z-20 h-full w-full"
            style={{ border: 'none' }}
          />
        )}
      </div>
    </div>
  )
}