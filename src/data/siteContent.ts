import {
  BarChart3,
  Bot,
  Code2,
  DatabaseZap,
  Layers3,
  Rocket,
  ShieldCheck,
  UsersRound,
} from 'lucide-react'
import emailLogo from '../assets/simbolo-email.png'
import instaLogo from '../assets/simbolo-insta.png'
import linkedinLogo from '../assets/simbolo-linkedin.png'
import whatsLogo from '../assets/simbolo-whats.png'
import type { ClientLogo, ContactOption, EntryPath, IconContent, ServiceContent } from '../types'

const whatsappPhone = '553597330160'

export function createWhatsAppLink(message: string) {
  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`
}

const clientLogoModules = import.meta.glob('../assets/dark/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP,svg,SVG}', {
  eager: true,
  import: 'default',
})

export const clientLogos: ClientLogo[] = Object.entries(clientLogoModules)
  .sort(([a], [b]) => {
    const numberA = Number(a.match(/\/(\d+)/)?.[1] ?? Number.MAX_SAFE_INTEGER)
    const numberB = Number(b.match(/\/(\d+)/)?.[1] ?? Number.MAX_SAFE_INTEGER)

    return numberA === numberB ? a.localeCompare(b) : numberA - numberB
  })
  .map(([path, image]) => {
    const fileName = path.split('/').pop()!.replace(/\.[^.]+$/, '')
    const label =
      fileName === '7'
        ? 'Portal IDEA'
        : fileName
            .replace(/-dark$/, '')
            .replace(/^\d+\s*/, '')
            .replace(/-/g, ' ')
            .replace(/\s+/g, ' ')

    return {
      image: image as string,
      label,
    }
  })

export const highlights: IconContent[] = [
  {
    icon: Rocket,
    title: 'Soluções inteligentes',
    text: 'Projetos pensados para resolver problemas reais sem inflar processos.',
  },
  {
    icon: Code2,
    title: 'Tecnologia eficiente',
    text: 'Aplicações modernas, performáticas e prontas para crescer com o negócio.',
  },
  {
    icon: UsersRound,
    title: 'Foco no que importa',
    text: 'Conversas claras, entregas objetivas e menos dependência técnica no dia a dia.',
  },
  {
    icon: BarChart3,
    title: 'Resultados que impulsionam',
    text: 'Automação, dados e software trabalhando para ganhar velocidade operacional.',
  },
]

export const painPoints: IconContent[] = [
  {
    icon: DatabaseZap,
    title: 'Sua operação vive em planilhas',
    text: 'Informações espalhadas dificultam acompanhamento, cobrança e tomada de decisão.',
  },
  {
    icon: Bot,
    title: 'Seu time perde tempo com tarefas repetidas',
    text: 'Atividades manuais consomem energia que poderia estar em atendimento, vendas e estratégia.',
  },
  {
    icon: Layers3,
    title: 'Seu site não mostra o valor da empresa',
    text: 'A presença digital existe, mas ainda não explica bem, não convence e não gera conversas.',
  },
  {
    icon: ShieldCheck,
    title: 'Você depende demais de improviso',
    text: 'Processos sem sistema ficam frágeis, difíceis de treinar e complicados de escalar.',
  },
]

export const services: ServiceContent[] = [
  {
    icon: Layers3,
    preview: 'web',
    title: 'Sites e sistemas web',
    text: 'Experiências digitais sob medida, de landing pages a plataformas internas.',
  },
  {
    icon: Bot,
    preview: 'automation',
    title: 'Automações e IA',
    text: 'Fluxos inteligentes para reduzir tarefas repetitivas e acelerar decisões.',
  },
  {
    icon: DatabaseZap,
    preview: 'data',
    title: 'Dados integrados',
    text: 'Dashboards, integrações e rotinas que deixam a informação pronta para uso.',
  },
  {
    icon: ShieldCheck,
    preview: 'support',
    title: 'Suporte técnico consultivo',
    text: 'Orientação próxima para manter sua operação simples, estável e segura.',
  },
]

export const entryPaths: EntryPath[] = [
  {
    title: 'Presença digital',
    label: 'Site ou landing page',
    text: 'Para explicar melhor sua oferta, captar contatos e dar uma primeira impressão mais forte.',
    whatsappMessage: 'Olá! Quero conversar sobre site ou landing page para minha empresa.',
  },
  {
    title: 'Operação eficiente',
    label: 'Automação de processo',
    text: 'Para eliminar tarefas repetidas, integrar ferramentas e ganhar tempo operacional.',
    whatsappMessage: 'Olá! Quero conversar sobre automação de processo para minha operação.',
  },
  {
    title: 'Gestão com dados',
    label: 'Dashboard ou integração',
    text: 'Para transformar informações soltas em visão clara para decidir e acompanhar resultados.',
    whatsappMessage: 'Olá! Quero conversar sobre dashboard ou integração de dados.',
  },
  {
    title: 'Sistema próprio',
    label: 'Plataforma interna',
    text: 'Para criar uma solução sob medida quando ferramentas prontas já não resolvem bem.',
    whatsappMessage: 'Olá! Quero conversar sobre uma plataforma interna sob medida.',
  },
]

export const rotatingNeeds = ['Site?', 'Sistema?', 'Dashboard?', 'App?', 'Portal?']
export const heroRotatingWords = ['complicação.', 'enrolação.', 'dificuldade.', 'mistério.']
export const processSteps = ['Entender', 'Simplificar', 'Construir', 'Evoluir']

export const contactOptions: ContactOption[] = [
  {
    image: whatsLogo,
    label: 'Whats',
    href: createWhatsAppLink('Olá! Vim pelo site da Monkeys Tecnologia e quero conversar.'),
  },
  {
    image: instaLogo,
    label: 'Insta',
    href: 'https://www.instagram.com/monkeystecnologia?igsh=M2NlMGw4MXp2NWIy',
  },
  {
    image: emailLogo,
    label: 'Email',
    href: 'mailto:contact@donethink.com',
  },
  {
    image: linkedinLogo,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/monkeys-tecnologia-544113416/',
  },
]
