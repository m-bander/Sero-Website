import { useEffect, useRef } from 'react'
import { useLanguage } from '../i18n'
import { useReducedMotion } from '../hooks/useReducedMotion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DOWNLOAD_URL = 'https://github.com/m-bander/Sero/releases/tag/v1.0.0'

export const DownloadSection = () => {
  const { translations, dir } = useLanguage()
  const prefersReducedMotion = useReducedMotion()

  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 30%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section
      id="download"
      ref={sectionRef}
      className="relative py-24 px-5 md:px-16 bg-surface"
      dir={dir}
    >
      <div className="max-w-4xl mx-auto text-center">
        <div ref={contentRef}>
          {/* Title */}
          <h2 className="text-headline-lg md:text-display-lg font-bold text-on-surface mb-6">
            {translations.downloadSection.title}
          </h2>

          {/* Subtitle */}
          <p className="text-body-lg text-on-surface-variant mb-12 max-w-2xl mx-auto">
            {translations.downloadSection.subtitle}
          </p>

          {/* Download Button */}
          <div className="flex flex-col items-center gap-4">
            <a
              href={DOWNLOAD_URL}
              className="inline-flex items-center gap-3 px-10 py-5 bg-primary-container text-on-primary-container rounded-button text-headline-sm font-semibold hover:bg-primary-fixed-dim transition-all duration-300 glow-green-active shadow-xl hover:scale-105"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {translations.downloadSection.cta}
            </a>

            {/* Platform Badge */}
            <div className="glass px-4 py-2 rounded-full">
              <span className="text-label-md uppercase text-on-surface-variant">
                {translations.downloadSection.platform}
              </span>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="mt-16 grid grid-cols-3 gap-4 max-w-md mx-auto opacity-30">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-1 bg-gradient-to-r from-transparent via-primary-container to-transparent rounded-full"
                style={{
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
