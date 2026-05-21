import { useState, useEffect } from 'react'
import './ProjectMedia.css'

export type MediaItem =
  | { type: 'image'; src: string; alt: string }
  | { type: 'video'; src: string; poster?: string }
  | { type: 'placeholder'; label: string; color?: string }

interface ProjectMediaProps {
  media: MediaItem[]
  title: string
}

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

function PlaceholderSlide({ label, color }: { label: string; color?: string }) {
  return (
    <div className="media-placeholder" style={{ background: color || 'var(--navy-3)' }}>
      <span className="media-placeholder__label">{label}</span>
    </div>
  )
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
        className="media-video__el w-full aspect-video object-cover"
      />
    </div>
  )
}

export default function ProjectMedia({ media, title }: ProjectMediaProps) {
  const [current, setCurrent] = useState(0)
  const total = media.length

  // Effect para transição automática (Carrossel Automático)
  useEffect(() => {
    if (total <= 1) return

    // Se a mídia atual for um vídeo, podemos pausar o autoplay do carrossel 
    // para deixar o usuário assistir ao vídeo completo sem pular de slide.
    if (media[current].type === 'video') return

    // Define o tempo de transição (ex: 4000ms = 4 segundos)
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % total)
    }, 4000)

    return () => clearInterval(interval)
  }, [current, total, media])

  const renderSlide = (item: MediaItem) => {
    switch (item.type) {
      case 'image':
        return <img src={item.src} alt={item.alt} className="media-image w-full object-cover relative" loading= "lazy" />
      case 'video':
        return <VideoSlide src={item.src} poster={item.poster} />
      case 'placeholder':
        return <PlaceholderSlide label={item.label} color={item.color} />
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

      {/* Paginação por pontos: Só aparece se houver mais de 1 mídia */}
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