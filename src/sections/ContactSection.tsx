import { useEffect, useState } from 'react'
import { Plus, UsersRound, X } from 'lucide-react'
import alyssonPhoto from '../assets/imgalys.jpeg'
import alyssonSignature from '../assets/alyssysign.png'
import alyssonThumbnail from '../assets/thumbalyssu2.jpeg'
import maxwellPhoto from '../assets/imgpnd.jpeg'
import maxwellSignature from '../assets/maxsign.png'
import maxwellThumbnail from '../assets/thumbmax.png'

const founders = [
  {
    name: 'Maxwell Siqueira',
    role: 'Fundador',
    signatureClassName: 'founder-signature--maxwell',
    photo: maxwellPhoto,
    thumbnail: maxwellThumbnail,
    signature: maxwellSignature,
    bio: 'CEO da Monkeys Tecnologia e engenheiro de software com mais de 14 anos de experiência no desenvolvimento de produtos digitais.\n\nEspecialista em arquitetura de software, desenvolvimento full-stack e soluções escaláveis, atuo conectando tecnologia e negócios para criar sistemas, automações e produtos que geram resultados reais para empresas.\n\nApaixonado por tecnologia, inovação e aprendizado contínuo, acredito no poder da tecnologia para simplificar processos, impulsionar crescimento e transformar ideias em resultados.',
  },
  {
    name: 'Alysson Sene',
    role: 'Cofundador',
    signatureClassName: 'founder-signature--alysson',
    photo: alyssonPhoto,
    thumbnail: alyssonThumbnail,
    signature: alyssonSignature,
    bio: 'Cofundador da Monkeys Tecnologia e desenvolvedor de software com sólida experiência na criação de soluções digitais focadas em aprimorar a experiência do usuário. Desde 2018, atua na área de tecnologia, com forte presença em ambientes ágeis, dinâmicos e colaborativos. Aos 30 anos, combina atenção aos detalhes, senso estético e visão estratégica com as melhores práticas de desenvolvimento para entregar produtos funcionais, escaláveis e bem projetados. Ambiciona alcançar posições de liderança técnica, contribuindo para o desenvolvimento de novos talentos e ajudando a construir soluções escaláveis, elegantes e com propósito.',
  },
]

export function ContactSection() {
  const [selectedFounder, setSelectedFounder] = useState<(typeof founders)[number] | null>(null)
  const [isTeamMenuOpen, setIsTeamMenuOpen] = useState(false)

  useEffect(() => {
    if (!selectedFounder) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedFounder(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedFounder])

  return (
    <>
      <section className="contact-section" id="sobre-nos">
        <div className="about-copy">
          <span className="section-kicker">
            <UsersRound size={18} />
            Sobre nós
          </span>
          <h2>Equipe para criar software sob medida.</h2>
          <p>
            Desenvolvemos soluções digitais sob medida para web, mobile e APIs, unindo tecnologia, design e estratégia.
            Nossa equipe multidisciplinar trabalha de forma colaborativa para transformar desafios em resultados, com
            processos ágeis, transparentes e adaptáveis às necessidades de cada cliente.
          </p>
        </div>
        <div className="contact-menu-wrap">
          <details className="contact-menu" onToggle={(event) => setIsTeamMenuOpen(event.currentTarget.open)}>
            <summary aria-label="Abrir perfis da equipe">
              <Plus size={24} strokeWidth={2.4} />
            </summary>
          </details>
          <div className={`contact-menu-items${isTeamMenuOpen ? ' is-open' : ''}`} aria-hidden={!isTeamMenuOpen}>
            {founders.map((founder) => (
              <button
                className={`founder-trigger ${founder.signatureClassName.replace('founder-signature', 'founder-trigger')}`}
                type="button"
                key={founder.name}
                onClick={() => setSelectedFounder(founder)}
              >
                <img src={founder.thumbnail} alt="" aria-hidden="true" />
                <span className="sr-only">Ver apresentação de {founder.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedFounder ? (
        <div className="founder-modal-backdrop" role="presentation" onClick={() => setSelectedFounder(null)}>
          <section
            className="founder-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="founder-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="founder-modal-close"
              type="button"
              aria-label="Fechar apresentação"
              onClick={() => setSelectedFounder(null)}
            >
              <X size={22} strokeWidth={2.4} />
            </button>
            <img className="founder-modal-photo" src={selectedFounder.photo} alt={selectedFounder.name} />
            <div className="founder-modal-copy">
              <p>{selectedFounder.bio}</p>
              <div className={`founder-signature ${selectedFounder.signatureClassName}`}>
                <img src={selectedFounder.signature} alt={`Assinatura de ${selectedFounder.name}`} />
                <h3 id="founder-modal-title">{selectedFounder.name}</h3>
                <span>{selectedFounder.role}</span>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </>
  )
}
