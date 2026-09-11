import { useEffect, useRef } from 'react'
import { useLanguage } from '../i18n'
import { useReducedMotion } from '../hooks/useReducedMotion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const KeysSection = () => {
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
        [titleRef.current, subtitleRef.current],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
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
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          delay: 0.3,
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
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-24 px-5 md:px-16 bg-black"
      dir={dir}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Visual - Key Inside Vault */}
          <div ref={visualRef} className="relative">
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Vault container */}
              <div className="absolute inset-0 glass rounded-card border-2 border-outline-variant flex items-center justify-center">
                {/* Inner vault */}
                <div className="relative w-48 h-48 glass rounded-card border border-primary-container/30">
                  {/* Glowing key inside */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      width="80"
                      height="80"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-primary-container glow-green-active animate-pulse-green"
                    >
                      <circle cx="7" cy="7" r="3" />
                      <path d="M10 7L21 7" />
                      <path d="M18 4L18 10" />
                      <path d="M15 7L15 10" />
                    </svg>
                  </div>

                  {/* Security rings */}
                  <div className="absolute inset-0 border-2 border-primary-container/20 rounded-card animate-pulse-green" />
                  <div
                    className="absolute inset-4 border border-primary-container/30 rounded-card"
                    style={{ animationDelay: '0.5s' }}
                  />
                </div>

                {/* Particle effects */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-primary-container rounded-full"
                    style={{
                      top: `${50 + 35 * Math.sin((i * 30 * Math.PI) / 180)}%`,
                      left: `${50 + 35 * Math.cos((i * 30 * Math.PI) / 180)}%`,
                      opacity: 0.4,
                      animation: `pulse-green ${2 + i * 0.2}s ease-in-out infinite`,
                    }}
                  />
                ))}
              </div>

              {/* "You" label outside */}
              <div className={`absolute ${dir === 'rtl' ? 'right-0' : 'left-0'} top-1/2 transform -translate-y-1/2 ${dir === 'rtl' ? 'translate-x-12' : '-translate-x-12'}`}>
                <div className="glass px-3 py-2 rounded-full">
                  <span className="text-label-md uppercase text-on-surface-variant">
                    {dir === 'rtl' ? 'أنت' : 'You'}
                  </span>
                </div>
              </div>

              {/* Status indicator */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary-container animate-pulse-green" />
                  <span className="text-label-md uppercase text-primary-container">
                    {translations.security.badges[1]}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className={dir === 'rtl' ? 'md:order-first' : ''}>
            <h2
              ref={titleRef}
              className="text-headline-lg md:text-display-lg font-bold text-on-surface mb-6"
            >
              {translations.keys.title}
            </h2>
            <p ref={subtitleRef} className="text-body-lg text-on-surface-variant">
              {translations.keys.subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
