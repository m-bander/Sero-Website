import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n'
import { useReducedMotion } from '../hooks/useReducedMotion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const SecuritySection = () => {
  const { translations, dir } = useLanguage()
  const prefersReducedMotion = useReducedMotion()
  const [currentBadge, setCurrentBadge] = useState(0)

  const sectionRef = useRef<HTMLElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const trustRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        statusRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
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

      const trustItems = trustRef.current?.children
      if (trustItems) {
        gsap.fromTo(
          Array.from(trustItems),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: trustRef.current,
              start: 'top 80%',
              end: 'top 40%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion) return

    const interval = setInterval(() => {
      setCurrentBadge((prev) => (prev + 1) % translations.security.badges.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [prefersReducedMotion, translations.security.badges.length])

  return (
    <section
      id="security"
      ref={sectionRef}
      className="relative py-24 px-5 md:px-16 bg-black"
      dir={dir}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Security Status Indicator */}
        <div ref={statusRef} className="mb-16">
          <div className="inline-flex flex-col items-center gap-6">
            {/* Animated Status Circle */}
            <div className="relative w-32 h-32">
              {/* Outer ring */}
              <div className="absolute inset-0 border-2 border-primary-container/30 rounded-full animate-pulse-green" />

              {/* Middle ring */}
              <div className="absolute inset-4 border border-primary-container/50 rounded-full" style={{ animationDelay: '0.5s' }} />

              {/* Inner core */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-primary-container/20 rounded-full flex items-center justify-center glow-green-active">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-primary-container"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
              </div>

              {/* Pulse effect */}
              <div className="absolute inset-0 border-2 border-primary-container rounded-full animate-ping opacity-20" />
            </div>

            {/* Status Text */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-container animate-pulse-green" />
                <span className="text-label-lg uppercase text-primary-container tracking-wider">
                  {translations.security.status}
                </span>
              </div>

              {/* Rotating Security Badges */}
              <div className="h-6 overflow-hidden">
                <div
                  className="transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateY(-${currentBadge * 24}px)` }}
                >
                  {translations.security.badges.map((badge, index) => (
                    <div
                      key={index}
                      className="h-6 flex items-center justify-center text-label-md uppercase text-on-surface-variant"
                    >
                      {badge}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Statements */}
        <div ref={trustRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {translations.trust.items.map((item, index) => (
            <div
              key={index}
              className="glass rounded-card p-6 text-center hover:bg-surface-container-high transition-all duration-300"
            >
              <p className="text-label-lg uppercase text-on-surface tracking-wide">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
