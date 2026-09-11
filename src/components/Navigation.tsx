import { useState, useEffect } from 'react'
import { useLanguage } from '../i18n'

export const Navigation = () => {
  const { translations, language, setLanguage, dir } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en')
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass' : 'bg-transparent'
        } ${isScrolled ? 'border-b border-outline-variant' : ''}`}
        dir={dir}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <div className="flex items-center justify-between h-20">
            {/* Brand */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-headline-sm font-bold text-on-surface hover:text-primary-container transition-colors"
            >
              {translations.nav.brand}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('privacy')}
                className="text-body-md text-on-surface-variant hover:text-on-surface transition-colors"
              >
                {translations.nav.privacy}
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="text-body-md text-on-surface-variant hover:text-on-surface transition-colors"
              >
                {translations.nav.features}
              </button>
              <button
                onClick={() => scrollToSection('security')}
                className="text-body-md text-on-surface-variant hover:text-on-surface transition-colors"
              >
                {translations.nav.security}
              </button>
              <button
                onClick={() => scrollToSection('download')}
                className="text-body-md text-on-surface-variant hover:text-on-surface transition-colors"
              >
                {translations.nav.download}
              </button>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleLanguage}
                className="text-label-lg text-on-surface-variant hover:text-primary-container transition-colors uppercase"
              >
                {language === 'en' ? 'EN' : 'AR'} / {language === 'en' ? 'AR' : 'EN'}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center text-on-surface"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ backdropFilter: 'blur(30px)', backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8" dir={dir}>
            <button
              onClick={() => scrollToSection('privacy')}
              className="text-headline-sm text-on-surface hover:text-primary-container transition-colors"
            >
              {translations.nav.privacy}
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-headline-sm text-on-surface hover:text-primary-container transition-colors"
            >
              {translations.nav.features}
            </button>
            <button
              onClick={() => scrollToSection('security')}
              className="text-headline-sm text-on-surface hover:text-primary-container transition-colors"
            >
              {translations.nav.security}
            </button>
            <button
              onClick={() => scrollToSection('download')}
              className="text-headline-sm text-on-surface hover:text-primary-container transition-colors"
            >
              {translations.nav.download}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
