import { useState } from 'react'
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
      {/* O vídeo agora roda automaticamente, em loop de forma silenciosa e nativa */}
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

export default function ProjectMedia({ media, title }: ProjectMediaProps) {
  // Mantemos o estado caso você queira controlar mídias estáticas no futuro,
  // mas os elementos visuais de controle de clique foram removidos.
  const [current] = useState(0)
  const total = media.length

  const renderSlide = (item: MediaItem) => {
    switch (item.type) {
      case 'image':
        return <img src={item.src} alt={item.alt} className="media-image" loading="lazy" />
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
          
          {/* 🚫 Os botões anteriores de controle de setas (carousel__btn) foram removidos daqui */}
        </div>
      </BrowserMockup>

      {/* 🚫 A div de paginação por pontos (carousel__dots) foi removida daqui */}
    </div>
  )
}