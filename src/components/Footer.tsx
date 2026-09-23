import { useLanguage } from '../i18n'

const DOWNLOAD_URL = 'https://github.com/m-bander/Sero/releases/tag/v1.0.0'

export const Footer = () => {
  const { translations, dir, language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en')
  }

  return (
    <footer className="relative py-16 px-5 md:px-16 bg-black border-t border-outline-variant" dir={dir}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <h3 className="text-headline-sm font-bold text-on-surface mb-3">
              {translations.nav.brand}
            </h3>
            <p className="text-body-md text-on-surface-variant">
              {translations.footer.tagline}
            </p>
          </div>

          {/* Links Column */}
          <div>
            <nav className="flex flex-col gap-3">
              <a
                href="/privacy.html"
                className="text-body-md text-on-surface-variant hover:text-on-surface transition-colors"
              >
                {translations.footer.privacyPolicy}
              </a>
              <a
                href={DOWNLOAD_URL}
                className="text-body-md text-on-surface-variant hover:text-on-surface transition-colors"
              >
                {translations.footer.download}
              </a>
            </nav>
          </div>

          {/* Language Switcher Column */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <button
              onClick={toggleLanguage}
              className="text-label-lg text-on-surface-variant hover:text-primary-container transition-colors uppercase tracking-wider"
            >
              {language === 'en' ? 'EN' : 'AR'} / {language === 'en' ? 'AR' : 'EN'}
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-outline-variant flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-body-md text-on-surface-variant">
            {translations.footer.copyright}
          </p>

          {/* Security Badge */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary-container animate-pulse-green" />
            <span className="text-label-md uppercase text-on-surface-variant">
              {translations.security.badges[1]}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
