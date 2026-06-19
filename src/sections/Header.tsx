import { useEffect, useState, type MouseEvent } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import monkeyIniLogo from '../assets/monkey-ini.png'
import { createWhatsAppLink } from '../data/siteContent'

const navItems = [
  { href: '#antes-solucao', label: 'Antes da Solução' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#caminhos', label: 'Caminhos' },
  { href: '#clientes', label: 'Clientes' },
  { href: '#sobre-nos', label: 'Sobre nós' },
]

function scrollToSection(href: string) {
  const target = document.querySelector<HTMLElement>(href)
  if (!target) return

  if (href === '#inicio') {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    window.history.pushState(null, '', href)
    return
  }

  const topbar = document.querySelector<HTMLElement>('.topbar')
  const topbarHeight = topbar?.offsetHeight ?? 0
  const willUseCompactHeader = window.scrollY + target.getBoundingClientRect().top > 80
  const desktopCompactHeight = 58
  const tabletCompactHeight = 64
  const targetOffset = willUseCompactHeader
    ? window.matchMedia('(max-width: 640px)').matches
      ? topbarHeight
      : window.matchMedia('(max-width: 980px)').matches
        ? tabletCompactHeight
        : desktopCompactHeight
    : topbarHeight
  const targetTop = window.scrollY + target.getBoundingClientRect().top - targetOffset + 1

  window.scrollTo({ top: Math.max(0, targetTop), left: 0, behavior: 'auto' })
  window.history.pushState(null, '', href)
}

function getCurrentNavSection() {
  const topbarHeight = document.querySelector<HTMLElement>('.topbar')?.offsetHeight ?? 0
  const activationLine = Math.max(topbarHeight + 96, window.innerHeight * 0.62)
  let currentSection = ''

  navItems.forEach((item) => {
    const target = document.querySelector<HTMLElement>(item.href)
    if (!target) return

    const sectionRect = target.getBoundingClientRect()
    if (sectionRect.top <= activationLine && sectionRect.bottom > topbarHeight) {
      currentSection = item.href
    }
  })

  return currentSection
}

export function Header() {
  const [isCompact, setIsCompact] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isMobileNav, setIsMobileNav] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 640px)')

    const updateHeaderState = () => {
      setIsMobileNav(mobileQuery.matches)
      if (!mobileQuery.matches) setIsMenuOpen(false)
      setIsCompact(window.scrollY > 80)
      setActiveSection(getCurrentNavSection())
    }

    updateHeaderState()
    window.addEventListener('scroll', updateHeaderState, { passive: true })
    window.addEventListener('resize', updateHeaderState)

    return () => {
      window.removeEventListener('scroll', updateHeaderState)
      window.removeEventListener('resize', updateHeaderState)
    }
  }, [])

  const handleBrandClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    setIsMenuOpen(false)
    setActiveSection('')
    scrollToSection('#inicio')
  }

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault()
    setActiveSection(href)

    if (isMobileNav) {
      setIsMenuOpen(false)
      window.requestAnimationFrame(() => {
        scrollToSection(href)
        window.setTimeout(() => setActiveSection(getCurrentNavSection() || href), 80)
      })
      return
    }

    scrollToSection(href)
    window.requestAnimationFrame(() => setActiveSection(href))
    window.setTimeout(() => setActiveSection(getCurrentNavSection() || href), 80)
  }

  return (
    <header
      className={`topbar${isCompact ? ' topbar--compact' : ''}${isMenuOpen ? ' topbar--menu-open' : ''}`}
      aria-label="Navegação principal"
    >
      <a
        className="brand"
        href="#inicio"
        aria-label="Monkeys Tecnologia"
        onClick={handleBrandClick}
      >
        <img className="brand-image" src={monkeyIniLogo} alt="Monkeys Tecnologia" />
      </a>

      <button
        className="nav-menu-toggle"
        type="button"
        aria-label={isMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
        aria-expanded={isMobileNav ? isMenuOpen : undefined}
        aria-controls="primary-navigation"
        onClick={() => setIsMenuOpen((current) => !current)}
      >
        {isMenuOpen ? <X size={24} strokeWidth={2.4} /> : <Menu size={24} strokeWidth={2.4} />}
      </button>

      <nav className="nav-links" id="primary-navigation" aria-label="Seções">
        {navItems.map((item) => (
          <a
            key={item.href}
            className={activeSection === item.href ? 'is-active' : undefined}
            href={item.href}
            aria-current={activeSection === item.href ? 'location' : undefined}
            onClick={(event) => handleNavClick(event, item.href)}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <a
        className="nav-cta"
        href={createWhatsAppLink('Olá! Vim pelo site da Monkeys Tecnologia e quero conversar.')}
        target="_blank"
        rel="noreferrer"
      >
        Conversar
        <ArrowRight size={18} strokeWidth={2.4} />
      </a>
    </header>
  )
}
