import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { en, Translations } from './en'
import { ar } from './ar'

export type Language = 'en' | 'ar'

interface LanguageContextType {
  language: Language
  translations: Translations
  setLanguage: (lang: Language) => void
  dir: 'ltr' | 'rtl'
}

const translations: Record<Language, Translations> = {
  en,
  ar,
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en')

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr')
    document.documentElement.setAttribute('lang', lang)
    localStorage.setItem('language', lang)
  }

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language | null
    if (saved && (saved === 'en' || saved === 'ar')) {
      setLanguage(saved)
    }
  }, [])

  const value: LanguageContextType = {
    language,
    translations: translations[language],
    setLanguage,
    dir: language === 'ar' ? 'rtl' : 'ltr',
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

export { en, ar }
export type { Translations }
