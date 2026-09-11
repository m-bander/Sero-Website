import { useEffect, useRef } from 'react'
import { useLanguage } from '../i18n'
import { useReducedMotion } from '../hooks/useReducedMotion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const PrivacySection = () => {
  const { translations, dir } = useLanguage()
  const prefersReducedMotion = useReducedMotion()

  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
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

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 30%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        visualRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 0.4,
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
      id="privacy"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-24 px-5 md:px-16 bg-surface"
      dir={dir}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Text Content */}
          <div className={dir === 'rtl' ? 'md:order-2' : ''}>
            <h2
              ref={titleRef}
              className="text-headline-lg md:text-display-lg font-bold text-on-surface mb-6 whitespace-pre-line"
            >
              {translations.privacy.title}
            </h2>
            <p ref={subtitleRef} className="text-body-lg text-on-surface-variant">
              {translations.privacy.subtitle}
            </p>
          </div>

          {/* Visual Representation */}
          <div ref={visualRef} className={`relative ${dir === 'rtl' ? 'md:order-1' : ''}`}>
            <div className="relative aspect-square">
              {/* Abstract encrypted media visualization */}
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-2 p-4">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="glass rounded-thumbnail overflow-hidden relative group"
                    style={{
                      animationDelay: `${i * 0.1}s`,
                    }}
                  >
                    {/* Simulated blurred/encrypted content */}
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-surface-container-high to-surface-container"
                      style={{
                        filter: 'blur(20px)',
                      }}
                    />
                    {/* Lock overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-primary-container"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    {/* Encrypted indicator */}
                    <div className="absolute top-2 right-2">
                      <div className="w-2 h-2 rounded-full bg-primary-container animate-pulse-green" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Vault container overlay */}
              <div className="absolute inset-0 border-2 border-outline-variant rounded-card pointer-events-none" />

              {/* Security badge */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary-container animate-pulse-green" />
                  <span className="text-label-md uppercase text-primary-container">
                    {translations.security.badges[0]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
