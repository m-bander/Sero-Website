import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n'
import { VaultScene } from './3d/VaultScene'
import { useResponsive } from '../hooks/useResponsive'
import { useReducedMotion } from '../hooks/useReducedMotion'
import gsap from 'gsap'

const DOWNLOAD_URL = 'https://download854.mediafire.com/44fj4kyey7dgXnxeRY8dnzjqq0fLeC1hqRFAM1u4oZ3VGnEtzflc7b5rsZv811shrHSZtwnuEAzqcJEVgmRx3OdAjyC3sASwziVae8EBGgfcsuCwgNFlcQBQIxj6i_p1oXmMYQ5iMmmpfw92_eXDNMxoXzNysYZLiV2ZBzfhUcu1/fsb7re6bf0d7gtq/Sero+Safe.apk'

export const Hero = () => {
  const { translations, dir } = useLanguage()
  const { isMobile } = useResponsive()
  const prefersReducedMotion = useReducedMotion()
  const [hasAnimated, setHasAnimated] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const securityRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, -rect.top / rect.height))
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (hasAnimated || prefersReducedMotion) return

    const timeline = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => setHasAnimated(true),
    })

    timeline
      .fromTo(statusRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5 })
      .fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, '-=0.4')
      .fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .fromTo(securityRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')

    return () => {
      timeline.kill()
    }
  }, [hasAnimated, prefersReducedMotion])

  const scrollToPrivacy = () => {
    const element = document.getElementById('privacy')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      dir={dir}
    >
      {/* 3D Vault Scene */}
      <div className="absolute inset-0 z-0">
        <VaultScene isMobile={isMobile} scrollProgress={scrollProgress} />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-16 text-center">
        {/* Status Eyebrow */}
        <div
          ref={statusRef}
          className="inline-block mb-6 px-4 py-2 rounded-full glass-light"
          style={{ opacity: prefersReducedMotion ? 1 : 0 }}
        >
          <span className="text-label-lg uppercase text-primary-container">{translations.hero.status}</span>
        </div>

        {/* Main Headline */}
        <h1
          ref={titleRef}
          className="text-display-lg md:text-[56px] md:leading-[64px] font-bold text-on-surface mb-6 whitespace-pre-line"
          style={{ opacity: prefersReducedMotion ? 1 : 0, letterSpacing: '-1.5px' }}
        >
          {translations.hero.title}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-body-lg md:text-[19px] md:leading-[28px] text-on-surface-variant mb-8 max-w-2xl mx-auto"
          style={{ opacity: prefersReducedMotion ? 1 : 0 }}
        >
          {translations.hero.subtitle}
        </p>

        {/* Security Statement */}
        <p
          ref={securityRef}
          className="text-body-md md:text-body-lg text-on-surface mb-12 max-w-xl mx-auto whitespace-pre-line font-medium"
          style={{ opacity: prefersReducedMotion ? 1 : 0 }}
        >
          {translations.hero.security}
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ opacity: prefersReducedMotion ? 1 : 0 }}
        >
          <a
            href={DOWNLOAD_URL}
            className="w-full sm:w-auto px-8 py-4 bg-primary-container text-on-primary-container rounded-button text-body-lg font-semibold hover:bg-primary-fixed-dim transition-all duration-300 glow-green-active shadow-lg"
          >
            {translations.hero.ctaPrimary}
          </a>

          <button
            onClick={scrollToPrivacy}
            className="w-full sm:w-auto px-8 py-4 glass-light text-on-surface rounded-button text-body-lg font-medium hover:bg-surface-container-high transition-all duration-300"
          >
            {translations.hero.ctaSecondary}
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-outline rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary-container rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
