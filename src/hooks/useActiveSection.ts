import { useEffect, useState } from 'react'

/** Mantém a navegação sincronizada com a seção visível na página. */
export function useActiveSection(selector = 'section[id]'): string {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id)
      }),
      { rootMargin: '-40% 0px -55% 0px' },
    )

    document.querySelectorAll(selector).forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [selector])

  return activeSection
}
