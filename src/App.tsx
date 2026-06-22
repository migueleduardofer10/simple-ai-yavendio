import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { BrowserRouter, Routes, Route, NavLink, Link, useLocation } from 'react-router-dom'

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
  ChevronDown: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="m6 9 6 6 6-6" />
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
/*  Navegación — cada item es una RUTA (no una sección de Inicio)       */
/* ------------------------------------------------------------------ */
const NAV = [
  { label: 'Inicio', to: '/' },
  { label: 'Resolvemos', to: '/resolvemos' },
  { label: 'Resultados', to: '/resultados' },
  { label: 'Equipo', to: '/equipo' },
]

// Vuelve al tope al cambiar de ruta.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
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

// Contraste "Hoy → Con Brío": mismo negocio, operando distinto.
const transformation = [
  {
    today: 'Cada nuevo cliente suma costos y dolores de cabeza.',
    after: 'Creces sin que los costos crezcan al mismo ritmo.',
  },
  {
    today: 'Datos regados entre Excel, WhatsApp y la memoria de tu gente.',
    after: 'Una sola fuente de verdad, ordenada y consultable.',
  },
  {
    today: 'Tareas repetitivas que se comen horas cada semana.',
    after: 'Lo repetitivo, automatizado: tu gente en lo que importa.',
  },
  {
    today: 'Sabes que la IA sirve, pero no por dónde arrancar.',
    after: 'Una hoja de ruta clara, implementada paso a paso.',
  },
]

const stats = [
  { value: '5x', label: 'más clientes para un cliente, sin nuevas contrataciones', color: 'text-brio-terra-light' },
  { value: '+50h', label: 'recuperadas por semana en operación', color: 'text-brio-gold' },
  { value: '<0.05s', label: 'latencia en producción, a escala de millones', color: 'text-brio-jade-light' },
  { value: '2–4', label: 'semanas para desplegar, no 4–8 meses', color: 'text-brio-terra-light' },
]

const clients = [
  { name: 'Rentify', logo: '/clients/rentify.png' },
  { name: 'IncaRail', logo: '/clients/incarail.png' },
  { name: 'Pacific Control', logo: '/clients/pacific-control.png' },
  { name: 'Fidegarante', logo: '/clients/fidegarante.png' },
  { name: 'ThrowinSalt', logo: '/clients/throwin-salt.png' },
]

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
    photo: '/team/founder-1.png',
    initials: 'BO',
    name: 'Bruno Oyague',
    role: 'CEO',
    area: 'Negocio',
    bio: 'Estrategia de negocio y producto. +1K empresas asesoradas en operación y crecimiento.',
    ring: 'ring-brio-terra/30 bg-brio-terra',
  },
  {
    photo: '/team/founder-2.jpg',
    initials: 'LT',
    name: 'Leonardo Torres',
    role: 'CTO',
    area: 'Tecnología',
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
  return (
    <header className="fixed top-0 inset-x-0 z-50 py-4">
      <div className="container-x flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-brio-ink text-brio-bone shadow-hard">
            <Icon.Sparkles className="h-4 w-4 text-brio-gold" />
          </span>
          <span className="text-xl font-extrabold tracking-tight text-brio-ink">
            {BRAND.name}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide transition-colors ${
                  isActive ? 'text-brio-terra' : 'text-brio-ink/75 hover:text-brio-terra'
                }`
              }
            >
              {label}
            </NavLink>
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
            {NAV.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-brio-muted ${
                    isActive ? 'text-brio-terra' : 'text-brio-ink/80'
                  }`
                }
              >
                {label}
              </NavLink>
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
        <div className="mb-12 max-w-2xl reveal">
          <h2 className="font-bold leading-[1.1] text-brio-ink" style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}>
            El mismo negocio,<br />
            <span className="text-brio-slate">operando distinto</span>
          </h2>
          <p className="mt-5 text-base text-brio-slate md:text-lg">
            No cambiamos lo que vendes. Cambiamos cómo lo haces — para que crezcas
            sin que los costos te ahoguen.
          </p>
          <span className="mt-6 block h-1.5 w-16 rounded-full bg-gradient-to-r from-brio-terra to-brio-gold" />
        </div>

        <div className="relative grid gap-5 lg:grid-cols-2">
          {/* Columna HOY */}
          <div className="reveal rounded-[22px] border border-brio-border bg-brio-paper p-6 shadow-hard-sm sm:p-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brio-ink/[0.04] px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-brio-slate/50" />
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-brio-slate">Hoy</span>
            </div>
            <ul className="space-y-4">
              {transformation.map((t, i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-snug text-brio-slate md:text-base">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brio-slate/10 text-brio-slate">
                    <Icon.Close className="h-3 w-3" />
                  </span>
                  <span>{t.today}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Flecha al centro (solo desktop) */}
          <div aria-hidden className="group absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 cursor-pointer lg:flex">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-brio-border bg-brio-paper text-brio-terra shadow-hard transition-all duration-300 group-hover:scale-110 group-hover:border-brio-terra group-hover:bg-brio-terra group-hover:text-white">
              <Icon.ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </div>

          {/* Columna CON BRÍO */}
          <div className="reveal rounded-[22px] border border-brio-jade/30 bg-brio-ink p-6 shadow-hard-lg sm:p-8" style={{ transitionDelay: '120ms' }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brio-jade/15 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-brio-jade animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-brio-jade-light">Con {BRAND.name}</span>
            </div>
            <ul className="space-y-4">
              {transformation.map((t, i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-snug text-white/85 md:text-base">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brio-jade/20 text-brio-jade-light">
                    <Icon.Check className="h-3 w-3" />
                  </span>
                  <span>{t.after}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
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
            <div key={c.name} className="group flex aspect-[4/3] items-center justify-center bg-brio-paper p-6">
              <img
                src={c.logo}
                alt={c.name}
                loading="lazy"
                decoding="async"
                className="h-12 w-auto max-w-[75%] object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 md:h-16"
              />
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

function FounderAvatar({ photo, initials, ring }: { photo: string; initials: string; ring: string }) {
  const [failed, setFailed] = useState(false)
  const base =
    'h-28 w-28 flex-shrink-0 rounded-full object-cover ring-4 ring-offset-4 ring-offset-brio-bone'
  if (failed) {
    return (
      <span className={`flex items-center justify-center text-2xl font-extrabold text-white ${base} ${ring}`}>
        {initials}
      </span>
    )
  }
  return (
    <img
      src={photo}
      alt=""
      loading="lazy"
      onError={() => setFailed(true)}
      className={`${base} ${ring}`}
    />
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
            <div key={f.name} className="reveal flex flex-col items-center rounded-[20px] border border-brio-border bg-brio-bone p-8 text-center shadow-hard-sm" style={{ transitionDelay: `${i * 100}ms` }}>
              <FounderAvatar photo={f.photo} initials={f.initials} ring={f.ring} />
              <h3 className="mt-6 text-xl font-bold text-brio-ink">{f.name}</h3>
              <p className="mt-1 font-mono text-xs font-medium uppercase tracking-[0.14em] text-brio-terra">
                {f.role} · {f.area}
              </p>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-brio-slate">{f.bio}</p>
              <a
                href="#"
                aria-label={`LinkedIn de ${f.name}`}
                className="mt-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-brio-border text-brio-slate/60 transition-colors hover:border-brio-terra hover:text-brio-terra"
              >
                <Icon.Linkedin className="h-4 w-4" />
              </a>
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
        <div className="grid max-w-5xl gap-3 md:grid-cols-2 md:items-start">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="reveal group cursor-pointer overflow-hidden rounded-2xl border border-brio-border bg-brio-paper shadow-hard-sm transition-colors duration-300 hover:border-brio-terra/60"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="flex items-center gap-3 px-5 py-4">
                <span aria-hidden className="font-mono text-brio-terra">{'>_'}</span>
                <h3 className="flex-1 font-bold text-brio-ink">{f.q}</h3>
                <Icon.ChevronDown className="h-5 w-5 flex-shrink-0 text-brio-slate/50 transition-transform duration-300 group-hover:rotate-180 group-hover:text-brio-terra" />
              </div>
              {/* grid-rows 0fr → 1fr anima la altura suavemente al hacer hover */}
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 pl-[2.6rem] text-sm leading-relaxed text-brio-slate">
                    {f.a}
                  </p>
                </div>
              </div>
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
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-white/50">Nombre</label>
                <input type="text" className="w-full rounded-xl border border-white/10 bg-brio-ink-dark/60 px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-brio-terra" placeholder="Tu nombre" />
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-white/50">Correo</label>
                <input type="email" className="w-full rounded-xl border border-white/10 bg-brio-ink-dark/60 px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-brio-terra" placeholder="tucorreo@empresa.com" />
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-white/50">¿Qué quieres resolver?</label>
                <textarea rows={3} className="w-full resize-none rounded-xl border border-white/10 bg-brio-ink-dark/60 px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-brio-terra" placeholder="Cuéntanos en una línea..." />
              </div>
              <button type="submit" className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-[13px] bg-brio-terra px-6 py-4 text-sm font-bold text-white shadow-hard transition-all duration-300 hover:-translate-y-0.5 hover:bg-brio-terra-dark">
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
/*  Pages                                                              */
/* ------------------------------------------------------------------ */
// Inicio — TODO el contenido de ahora vive aquí (ruta por defecto "/")
function Home() {
  useScrollReveal()
  return (
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
  )
}

// Página placeholder para las rutas que todavía no construimos.
function ComingSoon({ title }: { title: string }) {
  return (
    <main className="section-padding bg-brio-bone">
      <div className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-20 text-center">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-brio-terra/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-brio-terra">
          <span className="h-1.5 w-1.5 rounded-full bg-brio-terra animate-pulse" />
          Próximamente
        </span>
        <h1 className="font-display text-3xl font-extrabold text-brio-ink md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-md text-brio-slate">
          Esta página aún no existe. Por ahora todo el contenido vive en Inicio;
          pronto le damos el suyo.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-[13px] bg-brio-ink px-6 py-3 text-sm font-bold text-white shadow-hard transition-transform duration-300 hover:-translate-y-0.5"
        >
          Volver a Inicio
          <Icon.ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  )
}

/* ------------------------------------------------------------------ */
/*  App — router. Header y Footer son layout compartido por toda ruta. */
/* ------------------------------------------------------------------ */
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen w-full">
        <Header />
        <Routes>
          {/* Inicio — la única página real por ahora */}
          <Route path="/" element={<Home />} />

          {/* Rutas aún sin construir. Reemplaza <ComingSoon> por su
              componente real cuando creemos cada página. */}
          <Route path="/resolvemos" element={<ComingSoon title="Resolvemos" />} />
          <Route path="/resultados" element={<ComingSoon title="Resultados" />} />
          <Route path="/equipo" element={<ComingSoon title="Equipo" />} />
          <Route path="*" element={<ComingSoon title="Página no encontrada" />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
