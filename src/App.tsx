import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

/* ------------------------------------------------------------------ */
/*  Brand — change the name / contact in ONE place                     */
/* ------------------------------------------------------------------ */
const BRAND = {
  name: 'Brío',
  tagline: 'No recomendamos. Ejecutamos.',
  whatsapp:
    'https://wa.me/51991735542?text=Hola%2C%20vi%20su%20web%20y%20me%20interesa%20saber%20m%C3%A1s%20sobre%20Br%C3%ADo',
  email: 'ventas@brio.lat',
}

/* ------------------------------------------------------------------ */
/*  Minimal inline icon set (no extra dependency)                      */
/* ------------------------------------------------------------------ */
type IconProps = { className?: string }
const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const Icon = {
  Menu: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M4 5h16M4 12h16M4 19h16" />
    </svg>
  ),
  Close: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  ),
  ArrowRight: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  ArrowUp: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="m5 12 7-7 7 7M12 19V5" />
    </svg>
  ),
  Sparkles: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
      <path d="M20 2v4M22 4h-4" />
      <circle cx="4" cy="20" r="2" />
    </svg>
  ),
  MapPin: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Trending: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M16 7h6v6M22 7l-8.5 8.5-5-5L2 17" />
    </svg>
  ),
  Activity: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
  ),
  Check: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  Mail: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  ),
  Whatsapp: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  ),
  Linkedin: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  ),
}

/* ------------------------------------------------------------------ */
/*  Scroll reveal — adds .is-visible to every .reveal in view          */
/* ------------------------------------------------------------------ */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const trajectory = [
  { icon: Icon.Sparkles, color: 'gold', text: 'Haciendo IA desde antes de ChatGPT' },
  { icon: Icon.MapPin, color: 'terra', text: 'AI Lead en Silicon Valley' },
  { icon: Icon.Trending, color: 'jade', text: 'Criterio de negocio · +1K empresas' },
  { icon: Icon.Activity, color: 'gold', text: 'Producción a escala de millones' },
]

const problems = [
  'Tu operación creció y ahora cuesta más de lo que debería.',
  'Tu competencia ya automatiza y produce más con menos.',
  'Todo vive en Excel, WhatsApp y en la cabeza de tu gente.',
  'Sabes que la IA puede ayudarte, pero no por dónde empezar.',
]

const stats = [
  { value: '5x', label: 'más clientes para un cliente, sin nuevas contrataciones', color: 'text-brio-terra-light' },
  { value: '+50h', label: 'recuperadas por semana en operación', color: 'text-brio-gold' },
  { value: '<0.05s', label: 'latencia en producción, a escala de millones', color: 'text-brio-jade-light' },
  { value: '2–4', label: 'semanas para desplegar, no 4–8 meses', color: 'text-brio-terra-light' },
]

const clients = ['Rentify', 'IncaRail', 'Pacific Control', 'Fidegarante', 'ThrowinSalt']

const services = [
  {
    n: '1',
    title: 'Resolvemos',
    accent: 'bg-brio-terra',
    accentText: 'text-brio-terra',
    numColor: 'text-brio-terra/15',
    body: 'Consultoría con implementación. Entramos a tu operación, encontramos el problema y lo arreglamos con IA y software. No recomendamos: resolvemos.',
  },
  {
    n: '2',
    title: 'Capacitamos',
    accent: 'bg-brio-gold',
    accentText: 'text-brio-gold-dark',
    numColor: 'text-brio-gold/20',
    body: 'Formamos a tu gente. Cursos para ejecutivos que necesitan la visión y para equipos que necesitan herramientas para trabajar mejor hoy.',
  },
  {
    n: '3',
    title: 'Co-fundamos',
    accent: 'bg-brio-jade',
    accentText: 'text-brio-jade',
    numColor: 'text-brio-jade/15',
    body: 'Construimos contigo, desde adentro. Productos y operaciones potenciados por IA, con nuestro equipo metido en la cancha junto al tuyo.',
  },
]

const founders = [
  {
    initials: 'BO',
    name: 'Bruno Oyague',
    role: 'CEO',
    bio: 'Estrategia de negocio y producto. +1K empresas asesoradas en operación y crecimiento.',
    ring: 'ring-brio-terra/30 bg-brio-terra',
  },
  {
    initials: 'LT',
    name: 'Leonardo Torres',
    role: 'CTO',
    bio: 'AI Lead en Silicon Valley. Sistemas en producción a escala de millones de usuarios.',
    ring: 'ring-brio-jade/30 bg-brio-jade',
  },
]

const faqs = [
  { q: '¿Cuánto tiempo toma ver resultados?', a: 'El diagnóstico toma ~10 días. Las primeras mejoras se implementan en 2-4 semanas. Resultados medibles en 2-3 meses.' },
  { q: '¿Qué pasa si ya tenemos sistemas?', a: 'Los integramos, mejoramos o reemplazamos según lo que tenga sentido. No tiramos lo que funciona.' },
  { q: '¿Trabajan con empresas de mi tamaño?', a: 'Trabajamos con empresas de 10 a 80 empleados en toda Latinoamérica. Si facturas entre S/.500K y S/.10M al año, probablemente somos un buen fit.' },
  { q: '¿Cómo es diferente de contratar un freelancer?', a: 'Un freelancer codea y se va. Nosotros entendemos tu operación, construimos lo que necesitas y nos quedamos para mantenerlo.' },
]

const dotColor: Record<string, string> = {
  gold: 'bg-brio-gold',
  terra: 'bg-brio-terra',
  jade: 'bg-brio-jade',
}
const tintBg: Record<string, string> = {
  gold: 'bg-brio-gold/10',
  terra: 'bg-brio-terra/10',
  jade: 'bg-brio-jade/10',
}

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */
function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-brio-slate/70">
      {children}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  Sections                                                           */
/* ------------------------------------------------------------------ */
function Header() {
  const [open, setOpen] = useState(false)
  const links = [
    ['Inicio', '#inicio'],
    ['Resolvemos', '#que-hacemos'],
    ['Resultados', '#resultados'],
    ['Equipo', '#equipo'],
  ]
  return (
    <header className="fixed top-0 inset-x-0 z-50 py-4">
      <div className="container-x flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-brio-ink text-brio-bone shadow-hard">
            <Icon.Sparkles className="h-4 w-4 text-brio-gold" />
          </span>
          <span className="text-xl font-extrabold tracking-tight text-brio-ink">
            {BRAND.name}
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-sm font-medium tracking-wide text-brio-ink/75 transition-colors hover:text-brio-terra">
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button className="rounded-md border border-brio-ink/20 px-2 py-1 text-xs font-medium text-brio-ink/70 transition-colors hover:border-brio-terra hover:text-brio-terra">
            EN
          </button>
          <a href="#contacto" className="rounded-[13px] bg-brio-terra px-5 py-2 text-sm font-bold text-white shadow-hard transition-all duration-300 hover:-translate-y-0.5 hover:bg-brio-terra-dark">
            Hablemos
          </a>
        </div>

        <button
          aria-label="Abrir menú"
          className="md:hidden -m-2.5 p-2.5 text-brio-ink"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <Icon.Close className="h-6 w-6" /> : <Icon.Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden container-x mt-3">
          <div className="rounded-2xl border border-brio-border bg-brio-paper p-4 shadow-hard-lg">
            {links.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm font-medium text-brio-ink/80 hover:bg-brio-muted">
                {label}
              </a>
            ))}
            <a href="#contacto" onClick={() => setOpen(false)} className="mt-2 block rounded-[13px] bg-brio-terra px-5 py-3 text-center text-sm font-bold text-white shadow-hard">
              Hablemos
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-[100dvh] items-center overflow-hidden bg-brio-bone">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 texture-dots" />
        <div className="absolute -top-24 right-[8%] h-[40rem] w-[40rem] animate-float-slow glow-radial-terra" />
        <div className="absolute -bottom-40 -left-32 h-[34rem] w-[34rem] animate-float glow-radial-gold" />
      </div>

      <div className="container-x relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 pb-20 pt-28 lg:min-h-[100dvh] lg:grid-cols-[1.25fr_0.75fr] lg:gap-16 lg:py-28">
          {/* Copy */}
          <div className="reveal is-visible">
            <Pill>
              <span className="h-1.5 w-1.5 rounded-full bg-brio-jade animate-pulse" />
              {BRAND.tagline}
            </Pill>
            <h1 className="mb-7 mt-5 font-display font-extrabold leading-[1.05] tracking-[-0.03em] text-brio-ink" style={{ fontSize: 'clamp(1.8rem, 4.4vw, 3rem)' }}>
              <span className="block">Consultoría de Negocios,</span>
              <span className="block text-brio-terra">Adoptando la IA</span>
            </h1>
            <p className="mb-9 max-w-xl text-base leading-relaxed text-brio-slate md:text-lg">
              Consultora de negocios con alta capacidad de implementación técnica.
              Traemos la IA a tu operación para hacer más con menos.
            </p>
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <a href="#contacto" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[13px] bg-brio-ink px-8 py-4 text-sm font-bold text-white shadow-hard transition-all duration-300 hover:-translate-y-0.5">
                Llévate guías y herramientas gratis
                <Icon.ArrowRight className="h-4 w-4" />
              </a>
              <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[13px] bg-brio-cream px-6 py-4 text-sm font-bold text-brio-ink shadow-hard transition-all duration-300 hover:-translate-y-0.5 hover:bg-brio-border">
                <Icon.Whatsapp className="h-5 w-5" />
                Escríbenos ahora mismo
              </a>
            </div>
          </div>

          {/* Trajectory card */}
          <div className="flex justify-center lg:justify-end reveal is-visible">
            <div className="relative mx-auto w-full max-w-[24rem] select-none lg:mx-0 lg:ml-auto lg:max-w-[27rem]">
              <div className="relative rounded-[28px] border border-brio-border bg-brio-paper/80 p-6 backdrop-blur-sm shadow-hard-lg sm:p-7">
                <div className="mb-6 flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-brio-border" />
                  <span className="h-2.5 w-2.5 rounded-full bg-brio-border" />
                  <span className="h-2.5 w-2.5 rounded-full bg-brio-border" />
                  <span className="ml-auto">
                    <Pill>
                      <span className="h-1.5 w-1.5 rounded-full bg-brio-jade animate-pulse" />
                      Trayectoria
                    </Pill>
                  </span>
                </div>
                <div className="space-y-2.5">
                  {trajectory.map(({ icon: I, color, text }, i) => (
                    <div key={i} className={`flex items-center gap-3 rounded-2xl border border-brio-border px-3.5 py-3 ${tintBg[color]}`}>
                      <span className="relative flex-shrink-0">
                        <span className={`absolute inset-0 rounded-full opacity-40 animate-ping ${dotColor[color]}`} style={{ animationDuration: '3s', animationDelay: `${i * 0.5}s` }} />
                        <span className={`relative flex h-8 w-8 items-center justify-center rounded-full text-white ${dotColor[color]}`}>
                          <I className="h-4 w-4" />
                        </span>
                      </span>
                      <span className="text-sm font-semibold leading-tight text-brio-ink">{text}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-brio-border/60">
                  <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-brio-terra via-brio-gold to-brio-jade animate-pulse" style={{ animationDuration: '2.4s' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Problem() {
  return (
    <section className="section-padding relative overflow-hidden bg-brio-paper">
      <div aria-hidden className="pointer-events-none absolute inset-0 texture-dots" />
      <div className="container-x relative z-10">
        <div className="max-w-3xl reveal">
          <h2 className="font-bold leading-[1.1] text-brio-ink" style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}>
            <span className="block">Todos hablan de IA</span>
            <span className="block text-brio-slate">Nadie te dice cómo usarla</span>
          </h2>
          <span className="mt-6 block h-1.5 w-16 rounded-full bg-gradient-to-r from-brio-terra to-brio-gold" />
        </div>
        <ul className="mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
          {problems.map((p, i) => (
            <li key={i} className="reveal flex items-start gap-4 rounded-2xl border border-brio-border bg-brio-paper px-5 py-4 text-base leading-snug text-brio-ink/90 shadow-hard-sm md:text-lg" style={{ transitionDelay: `${i * 90}ms` }}>
              <span className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-brio-terra ring-4 ring-brio-terra/15" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Results() {
  return (
    <section id="resultados" className="section-padding bg-brio-ink scroll-mt-20">
      <div className="container-x">
        <div className="mb-12 md:mb-16 reveal">
          <h2 className="font-display font-extrabold leading-tight text-white" style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)' }}>
            El impacto que entregamos
          </h2>
          <span className="mt-5 block h-1.5 w-20 rounded-full bg-gradient-to-r from-brio-terra via-brio-gold to-brio-jade" />
        </div>
        <div className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={i} className="reveal rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.06] md:p-7" style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="mb-5 block h-1 w-8 rounded-full bg-brio-terra-light" />
              <p className={`font-display font-extrabold leading-none tabular-nums ${s.color}`} style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)' }}>
                {s.value}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Clients() {
  return (
    <section className="section-padding relative overflow-hidden bg-brio-muted">
      <div aria-hidden className="pointer-events-none absolute inset-0 texture-dots" />
      <div className="container-x relative z-10 reveal">
        <div className="mb-12 max-w-4xl">
          <h2 className="text-fluid-section font-bold leading-tight text-brio-ink">
            Clientes usando IA con nosotros
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-brio-border bg-brio-border lg:grid-cols-5">
          {clients.map((c) => (
            <div key={c} className="flex aspect-[4/3] items-center justify-center bg-brio-paper">
              <span className="font-display text-lg font-extrabold tracking-tight text-brio-ink/40 transition-colors duration-300 hover:text-brio-ink/70 md:text-xl">
                {c}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="que-hacemos" className="section-padding relative overflow-hidden bg-brio-bone scroll-mt-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 texture-dots" />
      <div className="container-x relative z-10">
        <div className="mb-12 max-w-4xl reveal">
          <h2 className="text-fluid-section font-bold leading-tight text-brio-ink">
            Nos adaptamos a tus necesidades
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <a key={s.n} href="#contacto" className="reveal card-hover group relative flex flex-col overflow-hidden rounded-[20px] border border-brio-border bg-brio-paper p-8 shadow-hard-sm" style={{ transitionDelay: `${i * 90}ms` }}>
              <span className={`pointer-events-none absolute -top-4 right-4 select-none text-8xl font-bold leading-none ${s.numColor}`}>
                {s.n}
              </span>
              <span className={`mb-6 h-1 w-10 rounded-full ${s.accent}`} />
              <h3 className="mb-3 text-3xl font-bold text-brio-ink">{s.title}</h3>
              <p className="mb-8 flex-1 text-sm leading-relaxed text-brio-slate">{s.body}</p>
              <span className={`inline-flex items-center gap-1.5 text-sm font-bold ${s.accentText}`}>
                Ver más
                <Icon.ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function Team() {
  return (
    <section id="equipo" className="section-padding bg-brio-paper scroll-mt-20">
      <div className="container-x">
        <div className="mb-12 max-w-4xl reveal">
          <h2 className="text-fluid-section font-bold leading-tight text-brio-ink">
            Dos fundadores, una obsesión: que funcione
          </h2>
          <p className="mt-4 max-w-2xl text-brio-slate">
            Negocio y tecnología en la misma mesa. Sin intermediarios, sin teléfono malogrado.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {founders.map((f, i) => (
            <div key={f.name} className="reveal flex flex-col rounded-[20px] border border-brio-border bg-brio-bone p-8 shadow-hard-sm" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="mb-5 flex items-center gap-4">
                <span className={`flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-extrabold text-white ring-4 ${f.ring}`}>
                  {f.initials}
                </span>
                <div>
                  <h3 className="text-xl font-bold text-brio-ink">{f.name}</h3>
                  <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-brio-terra">{f.role}</p>
                </div>
                <a href="#" aria-label={`LinkedIn de ${f.name}`} className="ml-auto text-brio-slate/60 transition-colors hover:text-brio-terra">
                  <Icon.Linkedin className="h-5 w-5" />
                </a>
              </div>
              <p className="text-sm leading-relaxed text-brio-slate">{f.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Faq() {
  return (
    <section className="section-padding bg-brio-bone">
      <div className="container-x">
        <div className="mb-12 max-w-4xl reveal">
          <h2 className="text-fluid-section font-bold leading-tight text-brio-ink">
            Preguntas honestas, respuestas honestas
          </h2>
        </div>
        <div className="grid max-w-5xl gap-4 md:grid-cols-2">
          {faqs.map((f, i) => (
            <div key={i} className="reveal rounded-2xl border border-brio-border bg-brio-paper p-6 shadow-hard-sm" style={{ transitionDelay: `${i * 70}ms` }}>
              <h3 className="mb-2 flex items-start gap-2 font-bold text-brio-ink">
                <span aria-hidden className="font-mono text-brio-terra">{'>_'}</span>
                {f.q}
              </h3>
              <p className="text-sm leading-relaxed text-brio-slate">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contacto" className="section-padding relative overflow-hidden bg-brio-ink scroll-mt-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 right-[10%] h-[28rem] w-[28rem] glow-radial-terra animate-float-slow" />
        <div className="absolute -bottom-24 left-[5%] h-[24rem] w-[24rem] glow-radial-jade animate-float" />
      </div>
      <div className="container-x relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="reveal">
            <h2 className="font-display font-extrabold leading-tight text-white" style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)' }}>
              Hablemos de tu operación
            </h2>
            <p className="mt-5 max-w-md text-white/60">
              Un diagnóstico de ~10 días y te decimos exactamente qué se puede
              automatizar. Sin compromiso, sin contratos largos.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-[13px] bg-brio-jade px-6 py-4 text-sm font-bold text-white shadow-hard transition-all duration-300 hover:-translate-y-0.5">
                <Icon.Whatsapp className="h-5 w-5" />
                WhatsApp directo
              </a>
              <a href={`mailto:${BRAND.email}`} className="inline-flex items-center justify-center gap-2 rounded-[13px] bg-white/10 px-6 py-4 text-sm font-bold text-white ring-1 ring-white/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15">
                <Icon.Mail className="h-5 w-5" />
                {BRAND.email}
              </a>
            </div>
          </div>

          <form className="reveal rounded-[24px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-white/50">Nombre</label>
                <input type="text" className="w-full rounded-xl border border-white/10 bg-brio-ink-dark/60 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-brio-terra" placeholder="Tu nombre" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-white/50">Correo</label>
                <input type="email" className="w-full rounded-xl border border-white/10 bg-brio-ink-dark/60 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-brio-terra" placeholder="tucorreo@empresa.com" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-white/50">¿Qué quieres resolver?</label>
                <textarea rows={3} className="w-full resize-none rounded-xl border border-white/10 bg-brio-ink-dark/60 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-brio-terra" placeholder="Cuéntanos en una línea..." />
              </div>
              <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-[13px] bg-brio-terra px-6 py-4 text-sm font-bold text-white shadow-hard transition-all duration-300 hover:-translate-y-0.5 hover:bg-brio-terra-dark">
                Enviar
                <Icon.ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-brio-ink-dark py-12">
      <div className="container-x flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-brio-terra text-white">
            <Icon.Sparkles className="h-4 w-4" />
          </span>
          <span className="text-lg font-extrabold text-white">{BRAND.name}</span>
        </div>
        <p className="text-sm text-white/40">
          © {new Date().getFullYear()} {BRAND.name}. {BRAND.tagline}
        </p>
        <div className="flex items-center gap-4 text-white/50">
          <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="transition-colors hover:text-brio-jade">
            <Icon.Whatsapp className="h-5 w-5" />
          </a>
          <a href={`mailto:${BRAND.email}`} aria-label="Correo" className="transition-colors hover:text-brio-terra">
            <Icon.Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */
export default function App() {
  useScrollReveal()
  return (
    <div className="min-h-screen w-full">
      <Header />
      <main>
        <Hero />
        <Problem />
        <Results />
        <Clients />
        <Services />
        <Team />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
