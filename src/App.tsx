import { LanguageProvider } from './i18n'
import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { PrivacySection } from './components/PrivacySection'
import { KeysSection } from './components/KeysSection'
import { FeaturesSection } from './components/FeaturesSection'
import { SecuritySection } from './components/SecuritySection'
import { DownloadSection } from './components/DownloadSection'
import { Footer } from './components/Footer'

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-black text-on-surface">
        <Navigation />
        <main>
          <Hero />
          <PrivacySection />
          <KeysSection />
          <FeaturesSection />
          <SecuritySection />
          <DownloadSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}

export default App
