import { ContactSection } from './sections/ContactSection'
import { ClientsSection } from './sections/ClientsSection'
import { EntrySection } from './sections/EntrySection'
import { Header } from './sections/Header'
import { HeroSection } from './sections/HeroSection'
import { HighlightsStrip } from './sections/HighlightsStrip'
import { PainSection } from './sections/PainSection'
import { ServicesSection } from './sections/ServicesSection'
import { useRevealOnScroll } from './hooks/useRevealOnScroll'
import { contactOptions } from './data/siteContent'
import './App.css'

function App() {
  useRevealOnScroll()

  return (
    <main className="site-shell">
      <Header />
      <HeroSection />
      <HighlightsStrip />
      <PainSection />
      <ServicesSection />
      <EntrySection />
      <ClientsSection />
      <ContactSection />
      <footer className="site-footer">
        <p>&copy; <b>2026 MonkeysTecnologia</b>. All rights reserved.</p>
        <div className="site-footer-socials" aria-label="Redes sociais">
          {contactOptions.map(({ icon: Icon, image, label, href }) => (
            <a
              href={href}
              key={label}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
              aria-label={label}
            >
              {image ? <img src={image} alt="" aria-hidden="true" /> : Icon ? <Icon aria-hidden="true" /> : null}
            </a>
          ))}
        </div>
      </footer>
    </main>
  )
}

export default App
