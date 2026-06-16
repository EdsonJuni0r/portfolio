import { useState, useEffect } from 'react'
import './ProjectMedia.css'

/* ─── Types ─────────────────────────────────────────────────────────── */
export type MediaItem =
  | { type: 'image';       src: string; alt: string }
  | { type: 'video';       src: string; poster?: string }
  | { type: 'placeholder'; label: string; color?: string }

interface ProjectMediaProps {
  media: MediaItem[]
  title: string
}

/* ─── Sub-components ─────────────────────────────────────────────────── */
function BrowserMockup({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="browser-mockup">
      <div className="browser-mockup__bar">
        <span className="browser-dot browser-dot--red" />
        <span className="browser-dot browser-dot--yellow" />
        <span className="browser-dot browser-dot--green" />
        <span className="browser-mockup__url">{title}</span>
      </div>
      <div className="browser-mockup__content">
        {children}
      </div>
    </div>
  )
}

function ImageSlide({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} className="media-image" loading="lazy" />
}

function VideoSlide({ src, poster }: { src: string; poster?: string }) {
  return (
    <div className="media-video">
      <video
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        className="media-video__el"
      />
    </div>
  )
}

function PlaceholderSlide({ label, color }: { label: string; color?: string }) {
  return (
    <div className="media-placeholder" style={{ background: color ?? 'var(--navy-3)' }}>
      <span className="media-placeholder__label">{label}</span>
    </div>
  )
}

/* ─── Main component ─────────────────────────────────────────────────── */
export default function ProjectMedia({ media, title }: ProjectMediaProps) {
  const [current, setCurrent] = useState(0)
  const total = media.length

  // Auto-advance carousel — skip for video slides (let them play)
  useEffect(() => {
    if (total <= 1 || media[current].type === 'video') return
    const id = setInterval(() => setCurrent(c => (c + 1) % total), 6000)
    return () => clearInterval(id)
  }, [current, total, media])

  const renderSlide = (item: MediaItem) => {
    switch (item.type) {
      case 'image':       return <ImageSlide src={item.src} alt={item.alt} />
      case 'video':       return <VideoSlide src={item.src} poster={item.poster} />
      case 'placeholder': return <PlaceholderSlide label={item.label} color={item.color} />
    }
  }

  if (total === 0) return null

  return (
    <div className="project-media">
      <BrowserMockup title={title}>
        <div className="carousel">
          <div
            className="carousel__track"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {media.map((item, i) => (
              <div key={i} className="carousel__slide">
                {renderSlide(item)}
              </div>
            ))}
          </div>
        </div>
      </BrowserMockup>

      {total > 1 && (
        <div className="carousel__dots">
          {media.map((_, i) => (
            <button
              key={i}
              className={`carousel__dot${i === current ? ' carousel__dot--active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
